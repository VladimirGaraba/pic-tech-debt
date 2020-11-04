<?php

namespace App\Http\Controllers\Api\V1\File;

use App\TblSite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mpdf;

class APIController extends Controller
{
	/**
	 * Create a new AuthController instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	/**
	 * Render print-friendly file
	 *
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function render(Request $request) {
		$params = $request->all();

        // Set user timezone
		date_default_timezone_set(timezone_name_from_abbr($params['tzAbbr']));

		$siteId = Auth::guard()->user()->tblUser->tblSite->idtblSite;
		$site = TblSite::findOrFail($siteId);

		$params['format'] = $site->getMeta('print-format', 'standard');
		if ($params['format'] === 'user-selectable') {
			$params['format'] = Auth::guard()->user()->getMeta('print-format', 'standard');
		}
		$params['site'] = $site->getAllMeta();
		$params['site']['SiteName'] = $site->SiteName;
    if (!empty($params['site']['logo-jpg'])) {
      $params['site']['logo-jpg'] = base64_encode(file_get_contents(Storage::disk( 'upload' )->getDriver()->getAdapter()->getPathPrefix() . $params['site']['logo-jpg']));
    }

		$params['displayId'] = !empty($params['naturalId']) ? $params['naturalId'] : substr($params['currentRecordId'], 0, 8);
		if (!array_key_exists('patientAge', $params)) {
            $params['patientAge'] = '';
        }
        if (!array_key_exists('patientAgeUnits', $params)) {
            $params['patientAgeUnits'] = '';
        }

		foreach ($params['treatments'] as $key => $val) {
			if (!empty($params['treatments'][$key]['disposition'])) {
				$params['treatments'][ $key ]['disposition-label'] = preg_replace( '/\s+/', '-', trim( explode( '(', strtolower($params['treatments'][ $key ]['disposition'] ))[0] ) );
			}
			else {
				$params['treatments'][ $key ]['disposition-label'] = 'unknown';
			}
		}

		$params['investigationNotes'] = array();
		$params['otherNotes'] = array();
		foreach ($params['notes'] as $key => $value) {
		    if ($value['context'] === 'investigation' || $value['context'] === 'result') {
                $params['investigationNotes'][$key] = $value;
            } else {
                $params['otherNotes'][$key] = $value;
            }
        }

        foreach (array_keys($params) as $param) {
            if (preg_match('/^(patient|pregnant)/', $param)) {
                $params['patient'][$param] = $params[$param];
                unset($params[$param]);
            }
        }

        $mpdf_config = [
			'format'               =>   'A4',
			'showWatermarkImage'   => true,
            'margin_top'           => '10',
            'margin_bottom'        => '10',
            'margin_left'          => '20',
            'margin_right'         => '20',
            'margin_header'        => '10',
            'useSubstitutions'    => false,
            'simpleTables'        => true,
		];

        $mpdf = new Mpdf\Mpdf($mpdf_config);
        $mpdf->useSubstitutions = false;
        $mpdf->simpleTables = true;
        if ($params['format'] === 'medical') {
            $mpdf->SetWatermarkImage( public_path() . '/images/watermark-a4-full.png', 0.2, 'D', array( 0, 0 ) );
        }
		$mpdf->WriteHTML(view('file.render.standard', $params));
        return $mpdf->Output('document.pdf', 'I');
	}
}
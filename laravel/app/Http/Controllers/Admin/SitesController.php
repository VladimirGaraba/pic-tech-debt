<?php
/**
 * app/Http/Controllers/Admin/SitesController.php
 *
 * @package default
 */


namespace App\Http\Controllers\Admin;

use App\TblSite;
use App\TblISOtoCountry;
use App\TblOrganisation;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSitesRequest;
use App\Http\Requests\Admin\UpdateSitesRequest;
use Image;

class SitesController extends Controller
{

     /**
      * Display a listing of TblSite.
      *
      * @return \Illuminate\Http\Response
      */
     public function index() {
          if (!Gate::allows('administrate sites')) {
               return abort(401);
          }
          $sites = TblSite::with(['tblOrganisation', 'tblISOtoCountry'])->get();
          return view('admin.sites.index', compact('sites'));
     }


     /**
      * Show the form for creating rows in TblSite.
      *
      * @return \Illuminate\Http\Response
      */
     public function create() {
          if (!Gate::allows('administrate sites')) {
               return abort(401);
          }

          foreach (TblISOtoCountry::all() as $record) {
               $iso_to_country[$record->ISOAlpha2] = $record->CountryName;
          }
          asort($iso_to_country);

          return view('admin.sites.create', compact('iso_to_country'));
     }


     /**
      * Store new TblSite in storage.
      *
      * @param \App\Http\Requests\Admin\StoreSitesRequest $request
      * @return \Illuminate\Http\Response
      */
     public function store(StoreSitesRequest $request) {
          if (! (Gate::allows('administrate sites'))) {
               return abort(401);
          }

          $this->validate($request, [
               'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
               'shortcode' => 'bail|required|unique:tblSite,Shortcode|max:32',
          ]);

          $site = new TblSite;
          $site->SiteName = $request->get('site_name');
          $site->Shortcode = strtoupper($request->get('shortcode'));
          $site->tblISOtoCountry_ISOAlpha2 = $request->get('country_code');
          $site->SiteDefaultTimeZone = $request->get('timezone');

          $site->updateMeta('print-format', $request->input('meta')['print-format']);

          $org_record = null;

          if ($org_record = TblOrganisation::where('GooglePlaceId', $request->get('organisation_place_id'))->first()) {
          }
          else {
               $org_record = new TblOrganisation([
                         'tblISOtoCountry_ISOAlpha2' => $request->get('country_code'),
                         'OrganisationName' => $request->get('organisation_name'),
                         'OrganisationState' => $request->get('organisation_state'),
                         'OrganisationStreet' => $request->get('organisation_street1'),
                         'OrganisationStreet2' => $request->get('organisation_street2'),
                         'OrganisationSuburb' => $request->get('organisation_suburb'),
                         'OrganisationPostcode' => $request->get('organisation_postcode'),
                         'OrganisationLatitude' => $request->get('organisation_latitude'),
                         'OrganisationLongitude' => $request->get('organisation_longitude'),
                         'GooglePlaceId' => $request->get('organisation_place_id'),
                    ]);
               $org_record->save();
          }
          $site->tblOrganisation()->associate($org_record);

          $site->save();

          if ($request->hasFile('logo')) {

               try {
                 $logo = $request->file('logo');
                 $ext = strtolower($logo->getClientOriginalExtension());
                 $uniqid = uniqid('logo_');
                 $filename = "{$uniqid}.{$ext}";
                 $filename_jpg = "{$uniqid}.jpg";
                 $full_path = "sites/{$site->idtblSite}/{$filename}";
                 $full_path_jpg = "sites/{$site->idtblSite}/{$filename_jpg}";

                 // Resize the original
                 $resized = Image::make($logo->getRealPath())
                                 ->resize(300, null, function ($constraint) {
                                   $constraint->aspectRatio();
                                   $constraint->upsize();
                                 });
                 Storage::disk('upload')->put($full_path, (string) $resized->encode($ext, 80));

                 // Create a jpg version for printing
                 $original = Image::make($logo->getRealPath());
                 $resized_jpg = Image::canvas($original->width(), $original->height(), '#ffffff')
                                     ->insert($logo->getRealPath())
                                     ->resize(300, null, function ($constraint) {
                                       $constraint->aspectRatio();
                                       $constraint->upsize();
                                     });
                 Storage::disk('upload')->put($full_path_jpg, (string) $resized_jpg->encode('jpg', 80));

                 $site->updateMeta('logo', $full_path);
                 $site->updateMeta('logo-jpg', $full_path_jpg);
               } catch (\Exception $e) {
                    error_log($e->getMessage());
               }

          }

          $request->session()->flash('message', 'Site added.');
          return redirect()->route( 'admin.sites.edit', [$site->idtblSite] );
     }


     /**
      * Show the form for editing TblSite.
      *
      * @param int     $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id) {
          if (! (Gate::allows('administrate sites') || (Gate::allows('manage site') && Auth::user()->tblUser->tblSite->idtblSite == $id))) {
               return abort(401);
          }

          $site = TblSite::findOrFail($id);
          $site->loadMissing('tblOrganisation');

          foreach (TblISOtoCountry::all() as $record) {
               $iso_to_country[$record->ISOAlpha2] = $record->CountryName;
          }
          asort($iso_to_country);

          $meta = $site->getAllMeta();
          if (!empty($meta['logo'])) {
            $meta['logo'] = Storage::disk( 'upload' )->url( $meta['logo'] );
          }

          return view('admin.sites.edit', compact('site', 'meta', 'iso_to_country'));
     }


     /**
      * Update TblSite in storage.
      *
      * @param \App\Http\Requests\Admin\UpdateSitesRequest $request
      * @param int                                         $id
      * @return \Illuminate\Http\Response
      */
     public function update(UpdateSitesRequest $request, $id) {
          if (! (Gate::allows('administrate sites') || (Gate::allows('manage site') && Auth::user()->tblUser->tblSite->idtblSite == $id))) {
               return abort(401);
          }

          $this->validate($request, [
                    'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
                    'shortcode' => 'bail|required|unique:tblSite,Shortcode,' . $id . ',idtblSite|max:32',
               ]);

          $site = TblSite::findOrFail($id);
          $site->SiteName = $request->get('site_name');
          $site->Shortcode = strtoupper($request->get('shortcode'));
          $site->tblISOtoCountry_ISOAlpha2 = $request->get('country_code');
          $site->SiteDefaultTimeZone = $request->get('timezone');

          $site->updateMeta('print-format', $request->input('meta')['print-format']);

          if ($request->hasFile('logo')) {

               try {
                    $logo = $request->file('logo');
                    $ext = strtolower($logo->getClientOriginalExtension());
                    $uniqid = uniqid('logo_');
                    $filename = "{$uniqid}.{$ext}";
                    $filename_jpg = "{$uniqid}.jpg";
                    $full_path = "sites/{$site->idtblSite}/{$filename}";
                    $full_path_jpg = "sites/{$site->idtblSite}/{$filename_jpg}";

                    // Resize the original
                    $resized = Image::make($logo->getRealPath())
                                    ->resize(300, null, function ($constraint) {
                                      $constraint->aspectRatio();
                                      $constraint->upsize();
                                    });
                    Storage::disk('upload')->put($full_path, (string) $resized->encode($ext, 80));

                    // Create a jpg version for printing
                    $original = Image::make($logo->getRealPath());
                    $resized_jpg = Image::canvas($original->width(), $original->height(), '#ffffff')
                                    ->insert($logo->getRealPath())
                                    ->resize(300, null, function ($constraint) {
                                      $constraint->aspectRatio();
                                      $constraint->upsize();
                                    });
                    Storage::disk('upload')->put($full_path_jpg, (string) $resized_jpg->encode('jpg', 80));

                    $site->updateMeta('logo', $full_path);
                    $site->updateMeta('logo-jpg', $full_path_jpg);
               } catch(\Exception $e) {
                    error_log($e->getMessage());
               }

          }

          $org_record = null;

          if ($org_record = TblOrganisation::where('GooglePlaceId', $request->get('organisation_place_id'))->first()) {
          }
          else {
               $org_record = new TblOrganisation([
                         'tblISOtoCountry_ISOAlpha2' => $request->get('country_code'),
                         'OrganisationName' => $request->get('organisation_name'),
                         'OrganisationState' => $request->get('organisation_state'),
                         'OrganisationStreet' => $request->get('organisation_street1'),
                         'OrganisationStreet2' => $request->get('organisation_street2'),
                         'OrganisationSuburb' => $request->get('organisation_suburb'),
                         'OrganisationPostcode' => $request->get('organisation_postcode'),
                         'OrganisationLatitude' => $request->get('organisation_latitude'),
                         'OrganisationLongitude' => $request->get('organisation_longitude'),
                         'GooglePlaceId' => $request->get('organisation_place_id'),
                    ]);
               $org_record->save();
          }
          $site->tblOrganisation()->associate($org_record);

          $site->save();
          $request->session()->flash('message', 'Site updated.');
          return redirect()->route( 'admin.sites.edit', [$id] );
     }


}

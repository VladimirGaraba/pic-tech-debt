<?php
/**
 * StoreSitesRequest.php
 *
 * @package default
 */


namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreSitesRequest extends FormRequest
{

     /**
      * Determine if the user is authorized to make this request.
      *
      * @return bool
      */
     public function authorize() {
          if (Gate::allows('administrate sites')) {
               return true;
          }
          else {
               return false;
          }
     }


     /**
      * Get the validation rules that apply to the request.
      *
      * @return array
      */
     public function rules() {
          return [];
     }


}

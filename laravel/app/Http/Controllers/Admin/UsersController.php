<?php
/**
 * app/Http/Controllers/Admin/UsersController.php
 *
 * @package default
 */


namespace App\Http\Controllers\Admin;

use App\User;
use App\TblSite;
use App\TblUser;
use Silber\Bouncer\Database\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUsersRequest;
use App\Http\Requests\Admin\UpdateUsersRequest;

class UsersController extends Controller
{

     /**
      * Display a listing of User.
      *
      * @return \Illuminate\Http\Response
      */
     public function index() {
          if (! Gate::allows('manage users')) {
               return abort(401);
          }
          $current_user = Auth::user();
          $tbl_user_record = TblUser::where('userId', $current_user->id)->first();

          $users = null;
          if (Gate::allows('administrate users')) {
               $users = User::with('roles')->get();
          }
          else {
               $tbl_users = TblUser::where('tblSite_idtblSite', $tbl_user_record->tblSite_idtblSite)->get();
               $users = User::with('roles')->find($tbl_users->pluck('userId')->all());
          }

          return view('admin.users.index', compact('users'));
     }


     /**
      * Show the form for creating new User.
      *
      * @return \Illuminate\Http\Response
      */
     public function create() {
          if (! Gate::allows('manage users')) {
               return abort(401);
          }

          $current_user = Auth::user();
          $tbl_user_record = TblUser::where('userId', $current_user->id)->first();
          $current_site = $tbl_user_record->tblSite_idtblSite;

          $roles = $this->getRoles();

          $sites = null;
          if (Gate::allows('administrate sites')) {
               $sites = TblSite::all()->mapWithKeys(
                    function ($item) {
                         return [$item['idtblSite'] => $item['SiteName']];
                    }


               );
          }
          else {
               $current_site_obj = TblSite::find($current_site);
               $sites = [$current_site_obj['idtblSite'] => $current_site_obj['SiteName']];
          }


          return view('admin.users.create', compact('roles', 'sites', 'current_site'));
     }


     /**
      * Store a newly created User in storage.
      *
      * @param \App\Http\Requests\Admin\StoreUsersRequest $request
      * @return \Illuminate\Http\Response
      */
     public function store(StoreUsersRequest $request) {
          if (! Gate::allows('manage users')) {
               return abort(401);
          }
          $user = User::create($request->all());

          foreach ($request->input('roles') as $role) {
               $user->assign($role);
          }

          // New user defaults to site of current user
          $tblUser = new TblUser([
                    'tblSite_idtblSite' => $request->get('site'),
                    'UserPhone' => $request->input('tblUser')['UserPhone'],
                    'UserJob' => $request->input('tblUser')['UserJob']
               ]);

          $tblUser->user()->associate($user);
          $tblUser->save();

          return redirect()->route('admin.users.index');
     }


     /**
      * Show the form for editing User.
      *
      * @param int     $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id) {
          if (! (Gate::allows('manage users') || Auth::user()->id == $id)) {
               return abort(401);
          }
          $roles = $this->getRoles();

          $user = User::findOrFail($id);

          $roleOpts = ['class' => 'form-control select2', 'multiple' => 'multiple'];
          if (Gate::allows('manage users')) $roleOpts['required'] = '';
          if (!Gate::allows('manage users')) $roleOpts['readonly'] = '';

          $jobOptions = array_filter(\App\TblUser::$jobs, function($j) {
              switch ($j) {
                  case 'admin':
                      if (!Gate::allows('manage users')) {
                          return false;
                      }
                      break;
              }
              return true;
          });

          $tblUser = $user->tblUser();
          $tblUserObj = $user->tblUser;
          $meta = $user->getAllMeta()->toArray();

          $siteMeta = $user->tblUser->tblSite->getAllMeta()->toArray();
          $sites = TblSite::all()->mapWithKeys(
               function ($item) {
                    return [$item['idtblSite'] => $item['SiteName']];
               }


          );

          return view('admin.users.edit', compact('user', 'roles', 'roleOpts', 'jobOptions', 'tblUser', 'meta', 'siteMeta', 'tblUserObj', 'sites'));
     }


     /**
      * Update User in storage.
      *
      * @param \App\Http\Requests\UpdateUsersRequest $request
      * @param int                                   $id
      * @return \Illuminate\Http\Response
      */
     public function update(UpdateUsersRequest $request, $id) {
          if (! (Gate::allows('manage users') || Auth::user()->id == $id)) {
               return abort(401);
          }

          $user = User::findOrFail($id);
          $user->update($request->all());

          if (Gate::allows('manage users')) {
               foreach ( $user->roles as $role ) {
                    $user->retract( $role );
               }
               foreach ( $request->input( 'roles' ) as $role ) {
                    $user->assign( $role );
               }
          }

          $user->tblUser()->update([
              'UserPhone' => $request->input('tblUser')['UserPhone'],
              'UserJob' => $request->input('tblUser')['UserJob'],
              'tblSite_idtblSite' => $request->get('site')
          ]);

          if (array_key_exists('print-format', $request->input('meta'))) {
              $user->updateMeta( 'print-format', $request->input( 'meta' )['print-format'] );
          }
          $user->updateMeta('theme', $request->input('meta')['theme']);

          if (Gate::allows('manage users')) {
               return redirect()->route( 'admin.users.index' );
          } else {
               $request->session()->flash('message', 'Profile updated.');
               return redirect()->route( 'admin.users.edit', [$id] );
          }
     }


     /**
      * Remove User from storage.
      *
      * @param int     $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id) {
          if (! Gate::allows('manage users')) {
               return abort(401);
          }
          $user = User::findOrFail($id);
          $user->delete();

          return redirect()->route('admin.users.index');
     }


     /**
      * Delete all selected User at once.
      *
      * @param Request $request
      * @return unknown
      */
     public function massDestroy(Request $request) {
          if (! Gate::allows('manage users')) {
               return abort(401);
          }
          if ($request->input('ids')) {
               $entries = User::whereIn('id', $request->input('ids'))->get();

               foreach ($entries as $entry) {
                    $entry->delete();
               }
          }
     }


     /**
      * Filter visible roles based on role of current user.
      *
      * @return mixed
      */
     private function getRoles() {
          $roles = Role::get()->pluck('name', 'name');
          if (Auth::user()->isNotAn('administrator')) {
               unset($roles['administrator']);
          }
          if (!(Auth::user()->isNotAn('administrator') || Auth::user()->isNotA('site_administrator'))) {
               unset($roles['site_administrator']);
          }

          return $roles;
     }


}

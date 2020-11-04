<?php
/**
 * User.php
 *
 * @package default
 */


namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Phoenix\EloquentMeta\MetaTrait;
use Hash;

/**
 * Class User
 *
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @package App
 */
class User extends Authenticatable implements JWTSubject
{
     use SoftDeletes;
     use Notifiable;
     use HasRolesAndAbilities;
     use MetaTrait;

     /**
      * The attributes that should be mutated to dates.
      *
      * @var array
      */
     protected $dates = ['deleted_at'];

     /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
     protected $fillable = [
          'name', 'email', 'password', 'remember_token'
     ];

     /**
      * The attributes that should be hidden for arrays.
      *
      * @var array
      */
     protected $hidden = [
          'password', 'remember_token',
     ];

     /**
      * Get the identifier that will be stored in the subject claim of the JWT.
      *
      * @return mixed
      */
     public function getJWTIdentifier() {
          return $this->getKey();
     }

     /**
      * Return a key value array, containing any custom claims to be added to the JWT.
      *
      * @return array
      */
     public function getJWTCustomClaims() {
          return [
               'name'               => $this->name,
               'email'              => $this->email,
               'roles'              => $this->roles->pluck('name')->toArray(),
               'abilities'          => $this->getAbilities()->pluck('name')->toArray(),
               'org'                => $this->tblUser->tblSite->tblOrganisation->OrganisationName,
               'job'                => $this->tblUser->UserJob,
               'phone'              => $this->tblUser->UserPhone,
               'org_street'         => $this->tblUser->tblSite->tblOrganisation->OrganisationStreet,
               'org_suburb'         => $this->tblUser->tblSite->tblOrganisation->OrganisationSuburb,
               'org_state'          => $this->tblUser->tblSite->tblOrganisation->OrganisationState,
               'org_postcode'       => $this->tblUser->tblSite->tblOrganisation->OrganisationPostcode,
               'org_country'        => $this->tblUser->tblSite->tblOrganisation->tblISOtoCountry_ISOAlpha2,
               'site_id'            => $this->tblUser->tblSite->idtblSite,
               'site_shortcode'     => $this->tblUser->tblSite->Shortcode,
               'theme'              => $this->getMeta('theme'),
               'application_key_id' => config('app.application_key_id'),
               'application_key'    => config('app.application_keys')->{config('app.application_key_id')},
               'couch_uri'          => sprintf('%s/%s', config('database.couchdb.uri'), config('database.couchdb.database')),
               'couch_roles'        => config('database.couchdb.spa_roles'),
               'couch_token'        => hash_hmac('sha1', $this->email, config('database.couchdb.secret')),
          ];
     }


     /**
      * Hash password
      *
      * @param unknown $input
      */
     public function setPasswordAttribute($input) {
          if ($input)
               $this->attributes['password'] = app('hash')->needsRehash($input) ? Hash::make($input) : $input;
     }


     /**
      *
      * @return unknown
      */
     public function role() {
          return $this->belongsToMany(Role::class, 'assigned_roles', 'entity_id');
     }


     /**
      *
      * @return unknown
      */
     public function tblUser() {
          return $this->hasOne( 'App\TblUser', 'userId' );
     }


}

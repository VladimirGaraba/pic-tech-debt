<?php
/**
 * app/TblOrganisation.php
 *
 * @package default
 */


namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 *
 * @property int $idtblOrganisation
 * @property string $tblISOtoCountry_ISOAlpha2
 * @property string $OrganisationName
 * @property string $OrganisationState
 * @property string $OrganisationStreet
 * @property string $OrganisationStreet2
 * @property string $OrganisationSuburb
 * @property string $OrganisationPostcode
 * @property float $OrganisationLatitude
 * @property float $OrganisationLongitude
 * @property string $GooglePlaceId
 * @property TblISOtoCountry $tblISOtoCountry
 * @property TblInterlocutor[] $tblInterlocutors
 * @property TblSite[] $tblSites
 */
class TblOrganisation extends Model
{

     /**
      * The table associated with the model.
      *
      * @var string
      */
     protected $table = 'tblOrganisation';

     /**
      * The primary key for the model.
      *
      * @var string
      */
     protected $primaryKey = 'idtblOrganisation';

     /**
      *
      * @var array
      */
     protected $fillable = ['tblISOtoCountry_ISOAlpha2', 'OrganisationName', 'OrganisationState', 'OrganisationStreet', 'OrganisationStreet2', 'OrganisationSuburb', 'OrganisationPostcode', 'OrganisationLatitude', 'OrganisationLongitude', 'GooglePlaceId'];

     /**
      * Indicates if the model should be timestamped.
      *
      * @var bool
      */
     public $timestamps = false;

     /**
      *
      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
      */
     public function tblISOtoCountry() {
          return $this->belongsTo('App\TblISOtoCountry', 'tblISOtoCountry_ISOAlpha2', 'ISOAlpha2');
     }


     /**
      *
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
     public function tblInterlocutors() {
          return $this->hasMany('App\TblInterlocutor', 'tblOrganisation_idtblOrganisation', 'idtblOrganisation');
     }


     /**
      *
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
     public function tblSites() {
          return $this->hasMany('App\TblSite', 'tblOrganisation_idtblOrganisation', 'idtblOrganisation');
     }


}

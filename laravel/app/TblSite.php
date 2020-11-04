<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Phoenix\EloquentMeta\MetaTrait;

/**
 * @property int $idtblSite
 * @property string $SiteName
 * @property int $tblOrganisation_idtblOrganisation
 * @property string $tblISOtoCountry_ISOAlpha2
 * @property int $SiteDefaultTimeZone
 * @property string $Shortcode
 * @property TblISOtoCountry $tblISOtoCountry
 * @property TblOrganisation $tblOrganisation
 * @property TblCase[] $tblCases
 * @property TblUser[] $tblUsers
 */
class TblSite extends Model
{
		use MetaTrait;

    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblSite';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblSite';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * @var array
     */
    protected $fillable = ['SiteName', 'tblOrganisation_idtblOrganisation', 'tblISOtoCountry_ISOAlpha2', 'SiteDefaultTimeZone', 'Shortcode'];

		/**
		 * Indicates if the model should be timestamped.
		 *
		 * @var bool
		 */
		public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblISOtoCountry()
    {
        return $this->belongsTo('App\TblISOtoCountry', 'tblISOtoCountry_ISOAlpha2', 'ISOAlpha2');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblOrganisation()
    {
        return $this->belongsTo('App\TblOrganisation', 'tblOrganisation_idtblOrganisation', 'idtblOrganisation');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblCases()
    {
        return $this->belongsToMany('App\TblCase', 'CaseHASCareTeam', 'tblSite_idtblSite', 'tblCase_idtblCase');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblUsers()
    {
        return $this->hasMany('App\TblUser', 'tblSite_idtblSite', 'idtblSite');
    }
}

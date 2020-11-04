<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $CountryName
 * @property string $ISOAlpha2
 * @property string $ISOAlpha3
 * @property int $ISO_UN_M49
 * @property TblOrganisation[] $tblOrganisations
 * @property TblSite[] $tblSites
 */
class TblISOtoCountry extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblISOtoCountry';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'ISOAlpha2';

    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     * 
     * @var bool
     */
    public $incrementing = false;

    /**
     * @var array
     */
    protected $fillable = ['CountryName', 'ISOAlpha3', 'ISO_UN_M49'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblOrganisations()
    {
        return $this->hasMany('App\TblOrganisation', 'tblISOtoCountry_ISOAlpha2', 'ISOAlpha2');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblSites()
    {
        return $this->hasMany('App\TblSite', 'tblISOtoCountry_ISOAlpha2', 'ISOAlpha2');
    }
}

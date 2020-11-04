<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblClinicalFeatures
 * @property string $ClinicalFeature
 * @property string $ClinicalFeatureCategory
 * @property CaseHASClinicalFeature[] $caseHASClinicalFeatures
 */
class TblClinicalFeature extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblClinicalFeatures';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblClinicalFeatures';

    /**
     * @var array
     */
    protected $fillable = ['ClinicalFeature', 'ClinicalFeatureCategory'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function caseHASClinicalFeatures()
    {
        return $this->hasMany('App\CaseHASClinicalFeature', 'tblClinicalFeatures_idtblClinicalFeatures', 'idtblClinicalFeatures');
    }
}

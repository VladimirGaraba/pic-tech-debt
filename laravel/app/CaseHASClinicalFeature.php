<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $tblCase_idtblCase
 * @property int $tblClinicalFeatures_idtblClinicalFeatures
 * @property boolean $CaseHASClinicalFeatureTime
 * @property TblCase $tblCase
 * @property TblClinicalFeature $tblClinicalFeature
 */
class CaseHASClinicalFeature extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'CaseHASClinicalFeatures';

    /**
     * @var array
     */
    protected $fillable = ['CaseHASClinicalFeatureTime'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblCase()
    {
        return $this->belongsTo('App\TblCase', 'tblCase_idtblCase', 'idtblCase');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblClinicalFeature()
    {
        return $this->belongsTo('App\TblClinicalFeature', 'tblClinicalFeatures_idtblClinicalFeatures', 'idtblClinicalFeatures');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgent
 * @property string $AgentName
 * @property int $GivenIntendedUse
 * @property int $tblAgentExposureRoute_idAgentExposureRoute
 * @property int $tblAgentExposureType_idtblAgentExposureType
 * @property int $tblAgentCommonNames_idtblAgentCommonNames
 * @property int $Quantity
 * @property string $TimeExposure
 * @property int $Duration
 * @property int $tblAgentCenterName_idtblCenterName
 * @property boolean $PatientOwnMedication
 * @property int $tblDurationUnits_idtblDurationUnits
 * @property int $tblQuantityUnits_idtblQuantityUnits
 * @property int $tblAgentCircumstance_idtblCaseCircumstance
 * @property TblAgentCenterName $tblAgentCenterName
 * @property TblAgentCircumstance $tblAgentCircumstance
 * @property TblAgentCommonName $tblAgentCommonName
 * @property TblAgentExposureRoute $tblAgentExposureRoute
 * @property TblAgentExposureType $tblAgentExposureType
 * @property TblAgentUseType $tblAgentUseType
 * @property TblDurationUnit $tblDurationUnit
 * @property TblQuantityUnit $tblQuantityUnit
 * @property TblCase[] $tblCases
 */
class TblAgent extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgent';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgent';

    /**
     * @var array
     */
    protected $fillable = ['AgentName', 'GivenIntendedUse', 'tblAgentExposureRoute_idAgentExposureRoute', 'tblAgentExposureType_idtblAgentExposureType', 'tblAgentCommonNames_idtblAgentCommonNames', 'Quantity', 'TimeExposure', 'Duration', 'tblAgentCenterName_idtblCenterName', 'PatientOwnMedication', 'tblDurationUnits_idtblDurationUnits', 'tblQuantityUnits_idtblQuantityUnits', 'tblAgentCircumstance_idtblCaseCircumstance'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentCenterName()
    {
        return $this->belongsTo('App\TblAgentCenterName', 'tblAgentCenterName_idtblCenterName', 'idtblCenterName');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentCircumstance()
    {
        return $this->belongsTo('App\TblAgentCircumstance', 'tblAgentCircumstance_idtblCaseCircumstance', 'idtblCaseCircumstance');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentCommonName()
    {
        return $this->belongsTo('App\TblAgentCommonName', 'tblAgentCommonNames_idtblAgentCommonNames', 'idtblAgentCommonNames');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentExposureRoute()
    {
        return $this->belongsTo('App\TblAgentExposureRoute', 'tblAgentExposureRoute_idAgentExposureRoute', 'idAgentExposureRoute');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentExposureType()
    {
        return $this->belongsTo('App\TblAgentExposureType', 'tblAgentExposureType_idtblAgentExposureType', 'idtblAgentExposureType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgentUseType()
    {
        return $this->belongsTo('App\TblAgentUseType', 'GivenIntendedUse', 'idtblAgentUseType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblDurationUnit()
    {
        return $this->belongsTo('App\TblDurationUnit', 'tblDurationUnits_idtblDurationUnits', 'idtblDurationUnits');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblQuantityUnit()
    {
        return $this->belongsTo('App\TblQuantityUnit', 'tblQuantityUnits_idtblQuantityUnits', 'idtblQuantityUnits');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblCases()
    {
        return $this->belongsToMany('App\TblCase', 'CaseHASAgents', 'tblAgent_idtblAgent', 'tblCase_idtblCase');
    }
}

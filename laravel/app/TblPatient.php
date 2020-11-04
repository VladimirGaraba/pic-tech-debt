<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblPatient
 * @property int $tblOccupationType_idOccupationType
 * @property string $PatientName
 * @property int $tblPopulationGroup_idtblPopulationGroup
 * @property int $tblLocationTypes_idtblLocationTypes
 * @property int $PregnancyStatus
 * @property int $Trimester
 * @property int $Lactating
 * @property int $tblRisk_idtblRisk
 * @property int $tblPatientWeight
 * @property int $tblWeightUnits_idtblWeightUnits
 * @property int $tblSexTypes_idtblSexTypes
 * @property int $tblAgeGroups_idtblAgeGroups
 * @property TblAgeGroup $tblAgeGroup
 * @property TblLocationType $tblLocationType
 * @property TblOccupationType $tblOccupationType
 * @property TblPopulationGroup $tblPopulationGroup
 * @property TblRisk $tblRisk
 * @property TblSexType $tblSexType
 * @property TblWeightUnit $tblWeightUnit
 * @property TblCase[] $tblCases
 */
class TblPatient extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblPatient';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblPatient';

    /**
     * @var array
     */
    protected $fillable = ['tblOccupationType_idOccupationType', 'PatientName', 'tblPopulationGroup_idtblPopulationGroup', 'tblLocationTypes_idtblLocationTypes', 'PregnancyStatus', 'Trimester', 'Lactating', 'tblRisk_idtblRisk', 'tblPatientWeight', 'tblWeightUnits_idtblWeightUnits', 'tblSexTypes_idtblSexTypes', 'tblAgeGroups_idtblAgeGroups'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblAgeGroup()
    {
        return $this->belongsTo('App\TblAgeGroup', 'tblAgeGroups_idtblAgeGroups', 'idtblAgeGroups');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblLocationType()
    {
        return $this->belongsTo('App\TblLocationType', 'tblLocationTypes_idtblLocationTypes', 'idtblLocationTypes');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblOccupationType()
    {
        return $this->belongsTo('App\TblOccupationType', 'tblOccupationType_idOccupationType', 'idOccupationType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblPopulationGroup()
    {
        return $this->belongsTo('App\TblPopulationGroup', 'tblPopulationGroup_idtblPopulationGroup', 'idtblPopulationGroup');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblRisk()
    {
        return $this->belongsTo('App\TblRisk', 'tblRisk_idtblRisk', 'idtblRisk');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblSexType()
    {
        return $this->belongsTo('App\TblSexType', 'tblSexTypes_idtblSexTypes', 'idtblSexTypes');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblWeightUnit()
    {
        return $this->belongsTo('App\TblWeightUnit', 'tblWeightUnits_idtblWeightUnits', 'idtblWeightUnits');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCases()
    {
        return $this->hasMany('App\TblCase', 'tblPatient_idtblPatient', 'idtblPatient');
    }
}

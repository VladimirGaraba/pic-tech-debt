<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCase
 * @property int $tblPatient_idtblPatient
 * @property int $tblCaseType_idtblCaseType
 * @property int $tblOutcomeType_idtblOutcomeType
 * @property string $couchDocId
 * @property int $tblNotes_idtblNotes
 * @property int $tblDisposition_idtblDisposition
 * @property TblCaseType $tblCaseType
 * @property TblDisposition $tblDisposition
 * @property TblNote $tblNote
 * @property TblOutcomeType $tblOutcomeType
 * @property TblPatient $tblPatient
 * @property TblAgent[] $tblAgents
 * @property TblSite[] $tblSites
 * @property CaseHASClinicalFeature[] $caseHASClinicalFeatures
 * @property TblTreatmentType[] $tblTreatmentTypes
 * @property TblCaseEvent[] $tblCaseEvents
 */
class TblCase extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblCase';

    /**
     * @var array
     */
    protected $fillable = ['tblPatient_idtblPatient', 'tblOutcomeType_idtblOutcomeType', 'couchDocId', 'tblNotes_idtblNotes', 'tblDisposition_idtblDisposition'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblCaseType()
    {
        return $this->belongsTo('App\TblCaseType', 'tblCaseType_idtblCaseType', 'idtblCaseType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblDisposition()
    {
        return $this->belongsTo('App\TblDisposition', 'tblDisposition_idtblDisposition', 'idtblDisposition');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblNote()
    {
        return $this->belongsTo('App\TblNote', 'tblNotes_idtblNotes', 'idtblNotes');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblOutcomeType()
    {
        return $this->belongsTo('App\TblOutcomeType', 'tblOutcomeType_idtblOutcomeType', 'idtblOutcomeType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblPatient()
    {
        return $this->belongsTo('App\TblPatient', 'tblPatient_idtblPatient', 'idtblPatient');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblAgents()
    {
        return $this->belongsToMany('App\TblAgent', 'CaseHASAgents', 'tblCase_idtblCase', 'tblAgent_idtblAgent');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblSites()
    {
        return $this->belongsToMany('App\TblSite', 'CaseHASCareTeam', 'tblCase_idtblCase', 'tblSite_idtblSite');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function caseHASClinicalFeatures()
    {
        return $this->hasMany('App\CaseHASClinicalFeature', 'tblCase_idtblCase', 'idtblCase');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblTreatmentTypes()
    {
        return $this->belongsToMany('App\TblTreatmentType', 'CaseHASTreatments', 'tblCase_idtblCase', 'tblTreatmentType_idTreatmentType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCaseEvents()
    {
        return $this->hasMany('App\TblCaseEvent', 'tblCase_idtblCase', 'idtblCase');
    }
}

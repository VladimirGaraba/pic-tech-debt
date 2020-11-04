<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCaseEvents
 * @property int $tblCase_idtblCase
 * @property int $tblUser_idtblUser
 * @property int $tblCasetoInterlocutor_idtblCasetoInterlocutor
 * @property boolean $CaseEventDirection
 * @property string $EventStartTime
 * @property string $EventEndTime
 * @property int $tblCommType_idtblCommType
 * @property int $tblSymptomSeverityScore_idtblSymptomSeverityScore
 * @property TblCase $tblCase
 * @property TblInterlocutor $tblInterlocutor
 * @property TblCommType $tblCommType
 * @property TblSymptomSeverityScore $tblSymptomSeverityScore
 * @property TblUser $tblUser
 */
class TblCaseEvents extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblCaseEvents';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblCaseEvents';

    /**
     * @var array
     */
    protected $fillable = ['tblCase_idtblCase', 'tblUser_idtblUser', 'tblCasetoInterlocutor_idtblCasetoInterlocutor', 'CaseEventDirection', 'EventStartTime', 'EventEndTime', 'tblCommType_idtblCommType', 'tblSymptomSeverityScore_idtblSymptomSeverityScore'];

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
    public function tblInterlocutor()
    {
        return $this->belongsTo('App\TblInterlocutor', 'tblCasetoInterlocutor_idtblCasetoInterlocutor', 'idtblCasetoInterlocutor');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblCommType()
    {
        return $this->belongsTo('App\TblCommType', 'tblCommType_idtblCommType', 'idtblCommType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblSymptomSeverityScore()
    {
        return $this->belongsTo('App\TblSymptomSeverityScore', 'tblSymptomSeverityScore_idtblSymptomSeverityScore', 'idtblSymptomSeverityScore');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblUser()
    {
        return $this->belongsTo('App\TblUser', 'tblUser_idtblUser', 'idtblUser');
    }
}

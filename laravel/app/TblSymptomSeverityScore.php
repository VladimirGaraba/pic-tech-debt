<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblSymptomSeverityScore
 * @property string $SymptomSeverityScoreName
 * @property TblCaseEvent[] $tblCaseEvents
 */
class TblSymptomSeverityScore extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblSymptomSeverityScore';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblSymptomSeverityScore';

    /**
     * @var array
     */
    protected $fillable = ['SymptomSeverityScoreName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCaseEvents()
    {
        return $this->hasMany('App\TblCaseEvent', 'tblSymptomSeverityScore_idtblSymptomSeverityScore', 'idtblSymptomSeverityScore');
    }
}

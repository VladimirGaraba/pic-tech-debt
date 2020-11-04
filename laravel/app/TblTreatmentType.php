<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idTreatmentType
 * @property string $TreatmentName
 * @property string $TreatmentCategory
 * @property TblCase[] $tblCases
 */
class TblTreatmentType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblTreatmentType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idTreatmentType';

    /**
     * @var array
     */
    protected $fillable = ['TreatmentName', 'TreatmentCategory'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tblCases()
    {
        return $this->belongsToMany('App\TblCase', 'CaseHASTreatments', 'tblTreatmentType_idTreatmentType', 'tblCase_idtblCase');
    }
}

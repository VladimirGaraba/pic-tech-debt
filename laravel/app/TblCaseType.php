<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCaseType
 * @property string $CaseTypeName
 * @property string $CaseSubType
 * @property TblCase[] $tblCases
 */
class TblCaseType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblCaseType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblCaseType';

    /**
     * @var array
     */
    protected $fillable = ['CaseTypeName', 'CaseSubType'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCases()
    {
        return $this->hasMany('App\TblCase', 'tblCaseType_idtblCaseType', 'idtblCaseType');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCaseCircumstance
 * @property string $CaseCircumstanceType
 * @property TblAgent[] $tblAgents
 */
class TblAgentCircumstance extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentCircumstance';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblCaseCircumstance';

    /**
     * @var array
     */
    protected $fillable = ['CaseCircumstanceType'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblAgents()
    {
        return $this->hasMany('App\TblAgent', 'tblAgentCircumstance_idtblCaseCircumstance', 'idtblCaseCircumstance');
    }
}

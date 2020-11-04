<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgentUseType
 * @property string $AgentUseType
 * @property TblAgent[] $tblAgents
 * @property TblAgentCenterName[] $tblAgentCenterNames
 */
class TblAgentUseType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentUseType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgentUseType';

    /**
     * @var array
     */
    protected $fillable = ['AgentUseType'];

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
        return $this->hasMany('App\TblAgent', 'GivenIntendedUse', 'idtblAgentUseType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblAgentCenterNames()
    {
        return $this->hasMany('App\TblAgentCenterName', 'tblAgentUseType_idtblAgentUseType', 'idtblAgentUseType');
    }
}

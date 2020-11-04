<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgentCommonNames
 * @property string $AgentCommonName
 * @property string $AgentManufacturer
 * @property TblAgent[] $tblAgents
 */
class TblAgentCommonName extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentCommonNames';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgentCommonNames';

    /**
     * @var array
     */
    protected $fillable = ['AgentCommonName', 'AgentManufacturer'];

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
        return $this->hasMany('App\TblAgent', 'tblAgentCommonNames_idtblAgentCommonNames', 'idtblAgentCommonNames');
    }
}

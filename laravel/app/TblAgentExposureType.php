<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgentExposureType
 * @property string $AgentExposureType
 * @property TblAgent[] $tblAgents
 */
class TblAgentExposureType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentExposureType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgentExposureType';

    /**
     * @var array
     */
    protected $fillable = ['AgentExposureType'];

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
        return $this->hasMany('App\TblAgent', 'tblAgentExposureType_idtblAgentExposureType', 'idtblAgentExposureType');
    }
}

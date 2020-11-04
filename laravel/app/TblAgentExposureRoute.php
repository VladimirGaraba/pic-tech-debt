<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idAgentExposureRoute
 * @property string $AgentExposureRoute
 * @property TblAgent[] $tblAgents
 */
class TblAgentExposureRoute extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentExposureRoute';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idAgentExposureRoute';

    /**
     * @var array
     */
    protected $fillable = ['AgentExposureRoute'];

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
        return $this->hasMany('App\TblAgent', 'tblAgentExposureRoute_idAgentExposureRoute', 'idAgentExposureRoute');
    }
}

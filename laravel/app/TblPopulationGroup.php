<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblPopulationGroup
 * @property string $PopulationGroupName
 * @property TblPatient[] $tblPatients
 */
class TblPopulationGroup extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblPopulationGroup';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblPopulationGroup';

    /**
     * @var array
     */
    protected $fillable = ['PopulationGroupName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblPatients()
    {
        return $this->hasMany('App\TblPatient', 'tblPopulationGroup_idtblPopulationGroup', 'idtblPopulationGroup');
    }
}

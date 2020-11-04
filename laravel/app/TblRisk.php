<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblRisk
 * @property string $RiskMeaning
 * @property TblPatient[] $tblPatients
 */
class TblRisk extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblRisk';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblRisk';

    /**
     * @var array
     */
    protected $fillable = ['RiskMeaning'];

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
        return $this->hasMany('App\TblPatient', 'tblRisk_idtblRisk', 'idtblRisk');
    }
}

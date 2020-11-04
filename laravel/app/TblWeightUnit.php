<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblWeightUnits
 * @property string $WeightUnitName
 * @property TblPatient[] $tblPatients
 */
class TblWeightUnit extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblWeightUnits';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblWeightUnits';

    /**
     * @var array
     */
    protected $fillable = ['WeightUnitName'];

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
        return $this->hasMany('App\TblPatient', 'tblWeightUnits_idtblWeightUnits', 'idtblWeightUnits');
    }
}

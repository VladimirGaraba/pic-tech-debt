<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgeGroups
 * @property string $AgeGroupName
 * @property integer $AgeGroupStartDays
 * @property integer $AgeGroupEndDays
 * @property TblPatient[] $tblPatients
 */
class TblAgeGroup extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgeGroups';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgeGroups';

    /**
     * @var array
     */
    protected $fillable = ['AgeGroupName', 'AgeGroupStartDays', 'AgeGroupEndDays'];

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
        return $this->hasMany('App\TblPatient', 'tblAgeGroups_idtblAgeGroups', 'idtblAgeGroups');
    }
}

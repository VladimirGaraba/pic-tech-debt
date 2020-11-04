<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idOccupationType
 * @property string $OccupationName
 * @property TblPatient[] $tblPatients
 */
class TblOccupationType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblOccupationType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idOccupationType';

    /**
     * @var array
     */
    protected $fillable = ['OccupationName'];

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
        return $this->hasMany('App\TblPatient', 'tblOccupationType_idOccupationType', 'idOccupationType');
    }
}

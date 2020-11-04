<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblSexTypes
 * @property string $SexTypeName
 * @property TblPatient[] $tblPatients
 */
class TblSexType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblSexTypes';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblSexTypes';

    /**
     * @var array
     */
    protected $fillable = ['SexTypeName'];

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
        return $this->hasMany('App\TblPatient', 'tblSexTypes_idtblSexTypes', 'idtblSexTypes');
    }
}

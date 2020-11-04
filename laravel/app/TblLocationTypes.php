<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblLocationTypes
 * @property string $LocationTypeName
 * @property TblInterlocutor[] $tblInterlocutors
 * @property TblPatient[] $tblPatients
 */
class TblLocationTypes extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblLocationTypes';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblLocationTypes';

    /**
     * @var array
     */
    protected $fillable = ['LocationTypeName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblInterlocutors()
    {
        return $this->hasMany('App\TblInterlocutor', 'tblLocationTypes_idtblLocationTypes', 'idtblLocationTypes');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblPatients()
    {
        return $this->hasMany('App\TblPatient', 'tblLocationTypes_idtblLocationTypes', 'idtblLocationTypes');
    }
}

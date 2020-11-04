<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblQuantityUnits
 * @property string $QuantityUnitName
 * @property TblAgent[] $tblAgents
 */
class TblQuantityUnit extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblQuantityUnits';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblQuantityUnits';

    /**
     * @var array
     */
    protected $fillable = ['QuantityUnitName'];

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
        return $this->hasMany('App\TblAgent', 'tblQuantityUnits_idtblQuantityUnits', 'idtblQuantityUnits');
    }
}

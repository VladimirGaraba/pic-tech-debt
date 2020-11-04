<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblDisposition
 * @property string $DispositionName
 * @property TblCase[] $tblCases
 */
class TblDisposition extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblDisposition';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblDisposition';

    /**
     * @var array
     */
    protected $fillable = ['DispositionName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCases()
    {
        return $this->hasMany('App\TblCase', 'tblDisposition_idtblDisposition', 'idtblDisposition');
    }
}

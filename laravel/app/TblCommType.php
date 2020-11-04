<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCommType
 * @property string $CommTypeName
 * @property TblCaseEvent[] $tblCaseEvents
 */
class TblCommType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblCommType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblCommType';

    /**
     * @var array
     */
    protected $fillable = ['CommTypeName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCaseEvents()
    {
        return $this->hasMany('App\TblCaseEvent', 'tblCommType_idtblCommType', 'idtblCommType');
    }
}

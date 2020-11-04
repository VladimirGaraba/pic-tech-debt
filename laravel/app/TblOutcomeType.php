<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblOutcomeType
 * @property string $OutcomeType
 * @property TblCase[] $tblCases
 */
class TblOutcomeType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblOutcomeType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblOutcomeType';

    /**
     * @var array
     */
    protected $fillable = ['OutcomeType'];

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
        return $this->hasMany('App\TblCase', 'tblOutcomeType_idtblOutcomeType', 'idtblOutcomeType');
    }
}

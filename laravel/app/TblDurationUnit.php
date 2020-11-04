<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblDurationUnits
 * @property string $DurationUnitName
 * @property TblAgent[] $tblAgents
 */
class TblDurationUnit extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblDurationUnits';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblDurationUnits';

    /**
     * @var array
     */
    protected $fillable = ['DurationUnitName'];

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
        return $this->hasMany('App\TblAgent', 'tblDurationUnits_idtblDurationUnits', 'idtblDurationUnits');
    }
}

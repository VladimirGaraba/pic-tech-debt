<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblAgentCategory
 * @property string $AgentCategoryName
 * @property TblAgentCenterName[] $tblAgentCenterNames
 */
class TblAgentCategory extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblAgentCategory';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblAgentCategory';

    /**
     * @var array
     */
    protected $fillable = ['AgentCategoryName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblAgentCenterNames()
    {
        return $this->hasMany('App\TblAgentCenterName', 'tblAgentCategory_idtblAgentCategory', 'idtblAgentCategory');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblInterlocutorCategory
 * @property string $InterlocutorCategoryName
 * @property TblInterlocutor[] $tblInterlocutors
 */
class TblInterlocutorCategory extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblInterlocutorCategory';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblInterlocutorCategory';

    /**
     * @var array
     */
    protected $fillable = ['InterlocutorCategoryName'];

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
        return $this->hasMany('App\TblInterlocutor', 'tblInterlocutorCategory_idtblInterlocutorCategory', 'idtblInterlocutorCategory');
    }
}

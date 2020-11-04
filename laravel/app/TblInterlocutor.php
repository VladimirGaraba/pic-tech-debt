<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblCasetoInterlocutor
 * @property string $InterlocutorName
 * @property int $tblInterlocutorCategory_idtblInterlocutorCategory
 * @property int $tblLocationTypes_idtblLocationTypes
 * @property int $tblOrganisation_idtblOrganisation
 * @property TblInterlocutorCategory $tblInterlocutorCategory
 * @property TblLocationType $tblLocationType
 * @property TblOrganisation $tblOrganisation
 * @property TblCaseEvent[] $tblCaseEvents
 */
class TblInterlocutor extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblInterlocutor';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblCasetoInterlocutor';

    /**
     * @var array
     */
    protected $fillable = ['InterlocutorName', 'tblInterlocutorCategory_idtblInterlocutorCategory', 'tblLocationTypes_idtblLocationTypes', 'tblOrganisation_idtblOrganisation'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblInterlocutorCategory()
    {
        return $this->belongsTo('App\TblInterlocutorCategory', 'tblInterlocutorCategory_idtblInterlocutorCategory', 'idtblInterlocutorCategory');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblLocationType()
    {
        return $this->belongsTo('App\TblLocationType', 'tblLocationTypes_idtblLocationTypes', 'idtblLocationTypes');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblOrganisation()
    {
        return $this->belongsTo('App\TblOrganisation', 'tblOrganisation_idtblOrganisation', 'idtblOrganisation');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCaseEvents()
    {
        return $this->hasMany('App\TblCaseEvent', 'tblCasetoInterlocutor_idtblCasetoInterlocutor', 'idtblCasetoInterlocutor');
    }
}

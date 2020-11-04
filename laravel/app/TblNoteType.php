<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblNoteType
 * @property string $NoteTypeName
 * @property TblNote[] $tblNotes
 */
class TblNoteType extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblNoteType';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblNoteType';

    /**
     * Indicates if the IDs are auto-incrementing.
     * 
     * @var bool
     */
    protected $incrementing = false;

    /**
     * @var array
     */
    protected $fillable = ['NoteTypeName'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblNotes()
    {
        return $this->hasMany('App\TblNote', 'tblNoteType_idtblNoteType', 'idtblNoteType');
    }
}

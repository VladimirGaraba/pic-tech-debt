<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblNotes
 * @property string $txtNotes
 * @property string $pathAttachment
 * @property int $tblNoteType_idtblNoteType
 * @property TblNoteType $tblNoteType
 * @property TblCase[] $tblCases
 */
class TblNote extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblNotes';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblNotes';

    /**
     * Indicates if the IDs are auto-incrementing.
     * 
     * @var bool
     */
    protected $incrementing = false;

    /**
     * @var array
     */
    protected $fillable = ['txtNotes', 'pathAttachment', 'tblNoteType_idtblNoteType'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblNoteType()
    {
        return $this->belongsTo('App\TblNoteType', 'tblNoteType_idtblNoteType', 'idtblNoteType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCases()
    {
        return $this->hasMany('App\TblCase', 'tblNotes_idtblNotes', 'idtblNotes');
    }
}

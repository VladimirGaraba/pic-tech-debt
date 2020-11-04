<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idtblUser
 * @property int $tblSite_idtblSite
 * @property boolean $UserLoggedinState
 * @property string $UserLoginTime
 * @property string $UserLoginHash
 * @property string $UserLogOutTime
 * @property string $Username
 * @property string $Password
 * @property string $UserDisplayName
 * @property string $UserEmail
 * @property string $UserPhone
 * @property string $UserJob
 * @property int $userId
 * @property TblSite $tblSite
 * @property TblCaseEvent[] $tblCaseEvents
 */
class TblUser extends Model
{
    const USER_JOB_SPI = 'spi';
    const USER_JOB_SPECIALIST = 'specialist';
    const USER_JOB_ADMIN = 'admin';

    public static $jobs = [
        self::USER_JOB_SPI,
        self::USER_JOB_SPECIALIST,
        self::USER_JOB_ADMIN
    ];

    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'tblUser';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'idtblUser';

    /**
     * Indicates if the IDs are auto-incrementing.
     * 
     * @var bool
     */
    public $incrementing = true;

    /**
     * @var array
     */
    protected $fillable = ['tblSite_idtblSite', 'UserLoggedinState', 'UserLoginTime', 'UserLoginHash', 'UserLogOutTime', 'Username', 'Password', 'UserDisplayName', 'UserEmail', 'UserPhone', 'UserJob', 'userId'];

    /**
     * Indicates if the model should be timestamped.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tblSite()
    {
        return $this->belongsTo('App\TblSite', 'tblSite_idtblSite', 'idtblSite');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tblCaseEvents()
    {
        return $this->hasMany('App\TblCaseEvent', 'tblUser_idtblUser', 'idtblUser');
    }

    public function user() {
      return $this->belongsTo('App\User', 'userId');
    }

    /**
     * Default UserJob is SPI
     *
     * @param $value
     *
     * @return string
     */
    public function getUserJobAttribute($value) {
        return !empty($value) ? $value : self::USER_JOB_SPI;
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
  protected $fillable = ['name', 'display_name'];
  public $timestamps = false;

  public function users() {
    return $this->hasMany('App\User');
  }
}

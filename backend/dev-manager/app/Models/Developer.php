<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Developer extends Model
{
    use HasFactory;

    protected $table = 'developers';

    protected $fillable = [
        'name',
        'gender',
        'birth_date',
        'hobby',
        'level_id',
    ];

    protected $appends = ['age'];

    public function getAgeAttribute()
    {
        return Carbon::parse($this->birth_date)->age;
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = ['Júnior', 'Pleno', 'Sênior', 'Tech Lead'];

        foreach ($levels as $level) {
            Level::create(['level' => $level]);
        }
    }
}

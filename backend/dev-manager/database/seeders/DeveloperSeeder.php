<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Developer;
use App\Models\Level;

class DeveloperSeeder extends Seeder
{
    public function run(): void
    {
        $levels = Level::all();

        if ($levels->isEmpty()) {
            $this->command->warn('Nenhum nível encontrado. Crie alguns levels antes de rodar esse seeder.');
            return;
        }

        Developer::factory(10)->make()->each(function ($developer) use ($levels) {
            $developer->level_id = $levels->random()->id;
            $developer->save();
        });
    }
}

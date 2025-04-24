<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DeveloperFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'sex' => $this->faker->randomElement(['M', 'F']),
            'birth_date' => $this->faker->date(),
            'hobby' => $this->faker->sentence(3),
            'level_id' => null,
        ];
    }
}


<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\DeveloperController;

Route::apiResource('levels', LevelController::class);
Route::apiResource('developers', DeveloperController::class);

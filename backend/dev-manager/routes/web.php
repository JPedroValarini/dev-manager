<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'API Dev Manager.',
        'version' => '1.0.0',
        'status' => 'ok'
    ]);
});
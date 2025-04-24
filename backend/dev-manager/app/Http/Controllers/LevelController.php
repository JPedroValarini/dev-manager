<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;

class LevelController extends Controller
{
    public function index() {
        return Level::all();
    }

    public function store(Request $request) {
        $request->validate([
            'level' => 'required|string',
        ]);
        return Level::create($request->all());
    }

    public function update(Request $request, $id) {
        $level = Level::findOrFail($id);
        $request->validate([
            'level' => 'required|string',
        ]);
        $level->update($request->all());
        return $level;
    }

    public function destroy($id) {
        $level = Level::findOrFail($id);
        $level->delete();
        return response(null, 204);
    }
}

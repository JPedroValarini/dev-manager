<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Developer;

class DeveloperController extends Controller
{
    public function index() {
        return Developer::with('level')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'level_id' => 'required|exists:levels,id',
            'name' => 'required|string',
            'sex' => 'required|in:M,F',
            'birth_date' => 'required|date',
            'hobby' => 'required|string',
        ]);
        return Developer::create($request->all());
    }

    public function update(Request $request, $id) {
        $developer = Developer::findOrFail($id);
        $request->validate([
            'level_id' => 'required|exists:levels,id',
            'name' => 'required|string',
            'sex' => 'required|in:M,F',
            'birth_date' => 'required|date',
            'hobby' => 'required|string',
        ]);
        $developer->update($request->all());
        return $developer;
    }

    public function destroy($id) {
        $developer = Developer::findOrFail($id);
        $developer->delete();
        return response(null, 204);
    }

}

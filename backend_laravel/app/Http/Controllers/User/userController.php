<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();

        return response()->json([
            'data' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'unique:users,username'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'string', 'in:administrator,admin gudang,kepala gudang'],
        ]);

        $user = User::create([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => $request->input('role'),
        ]);

        return response()->json([
            'message' => 'User berhasil dibuat',
            'data' => $user
        ]);
    }

    public function show(string $id)
    {
        $user = User::find($id);

        return response()->json([
            'data' => $user
        ]);
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        $request->validate([
            'username' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,' . $id],
            'password' => ['nullable', 'string', 'min:6'],
            'role' => ['required', 'string'],
        ]);

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->save();

        return response()->json([
            'message' => 'User berhasil diupdate',
            'data' => $user
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);

        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}


<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class authController extends Controller
{
    public function login(Request $request){
        $request->validate([
            "credentials" => ['required'],
            "password" => ["required"],
        ]);

        $dataLogin = $request->only(['credentials', 'password']);

        $user = User::where('username', $dataLogin['credentials'])->orWhere('email', $dataLogin['credentials'])->first();
        if(!$user){
            return response()->json([
                'message' => "Username Salah!"
            ], 401);
        }

        $valid_password = Hash::check($dataLogin['password'], $user->password);

        if (!$valid_password) {
            return response()->json([
                'message' => "Password salah!"
            ], 401);
        }
        
        Auth::login($user);
        $token = $user->createToken('auth_token_'.$user->role)->plainTextToken;
        return response()->json([
            'message' => "Login berhasil",
            'data' => [
                'token' => $token,
                'role' => $user->role
            ]
        ]);
    }

    public function logout(Request $request){
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response()->json(null,200);
    }
}

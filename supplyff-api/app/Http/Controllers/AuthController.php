<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $post_data = $request->validate([
            'username' => 'required|string|number|min:3|max:12',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8|max:12',
            'ingame_tag' => 'required|string|min:2|max:16',
        ]);

        $user = User::create([
            'username' => $post_data['username'],
            'email' => $post_data['email'],
            'password' => Hash::make($post_data['password']),
            'ingame_tag' => $post_data['ingame_tag'],
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $request->session()->regenerate();
        return response()->json(Auth::user(), 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }

    public function me()
    {
        return auth()->user();
    }
}
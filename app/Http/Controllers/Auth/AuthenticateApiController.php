<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticateApiController extends Controller
{
    public function login(Request $request): Response
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response('Not Autorized', 403);
        }

        $token = $request->user()->createToken('login');

        return response(['token' => $token->plainTextToken]);
    }
}

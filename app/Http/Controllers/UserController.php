<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function list(Request $request): Response
    {
        return Inertia::render('User/List', [
            'users' => new UserCollection(
                User::orderBy('name')
                    ->filter($request->only('search'))
                    ->paginate()
                    ->appends($request->all())
            )
        ]);
    }
}

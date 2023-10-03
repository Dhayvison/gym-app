<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
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

    public function create(): Response
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        event(new Registered($user));

        return redirect(route('user.list'));
    }
}

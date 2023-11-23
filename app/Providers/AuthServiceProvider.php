<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (User $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verificação de e-mail - GymApp')
                ->greeting("Olá! {$notifiable->name}")
                ->line('É um prazer tê-lo(a)  aqui conosco. Estamos ansiosos para ajudá-lo(a) a alcançar seus objetivos e bem-estar.')
                ->line('Para confirmar seu cadastro, por favor, clique no link abaixo:')
                ->action('Verificar endereço de e-mail', $url)
                ->line('Se você não reconhece esta solicitação de confirmação, pode simplesmente ignorar esta mensagem. Sua segurança é importante para nós.')
                ->salutation("Atenciosamente, \nEquipe GymApp");
        });
    }
}

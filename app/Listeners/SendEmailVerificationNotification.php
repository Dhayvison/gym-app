<?php

namespace App\Listeners;

use App\Events\Registered;

class SendEmailVerificationNotification
{
    public function handle(Registered $event)
    {
        if ($event->getUser()->isMember() && !$event->getUser()->hasVerifiedEmail()) {
            $event->getUser()->sendEmailVerificationNotification();
        }
    }
}

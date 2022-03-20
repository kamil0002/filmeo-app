<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Notifications\NewMovie;
use Illuminate\Support\Facades\Notification;

class NewMovieNotificationController extends Controller
{

    

   public function sendNotification() {

       $user = User::first();

       $notificationData = [
           'body' => 'Otrzymałeś nowe powiadomienie od Movie Rental!',
           'notificationText' => 'Właśnie został dodany nowy film do naszej kolekcji, sprwadź teraz!',
           'url' => url('facebook.com'),
       ];

       $user->notify(new NewMovie($notificationData));

    //    Notification::send($user, new sendNotification($notificationData));


   }
}

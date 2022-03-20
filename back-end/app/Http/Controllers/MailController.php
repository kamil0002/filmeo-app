<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

use App\Mail\WelcomeMail;

class MailController extends Controller
{
    public function sendWelcomeMail() {
        Mail::to('kamiln022@gmail.com')->send(new WelcomeMail());
        return view('welcome');
    }
}

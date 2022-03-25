<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RentalAvailability
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->role === 'user') {
            return $next($request);
        }

        return response([
            'status' => 'error',
            'message' => 'Ta funkcjonalność udostępniona jest tylko dla użytkownika!'
        ]);
    }
}

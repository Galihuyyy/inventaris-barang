<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {

        $user_role  = auth()->user()->role;

        if (in_array($user_role, $role)) {
            return $next($request);
        }

        return response()->json([
            'message' => $user_role . " access not allowed"
        ], 403);
        
    }
}

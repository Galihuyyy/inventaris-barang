<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class validId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, String $model, String $id_model): Response
    {
        $id = $request->route($id_model);
        
        $modelClass = 'App\Models\\' . $model;
        $find = $modelClass::find($id);


        if (! $find) {
            return response()->json([
                'message' => 'id '. str_replace('_', ' ', $id_model) .' tidak valid'
            ], 404);
        }
        
        return $next($request);
    }
}

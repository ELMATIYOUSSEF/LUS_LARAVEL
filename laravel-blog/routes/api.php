<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Routes API pour les catégories
Route::apiResource('categories', CategoryController::class);
// Routes API pour les articles
Route::apiResource('articles', ArticleController::class);
Route::get('categories/{id}/articles', [ArticleController::class, 'getByCategory']);
// Routes API pour les commentaires
Route::apiResource('comments', CommentController::class);
Route::get('articles/{id}/comments', [CommentController::class, 'getByArticle']);
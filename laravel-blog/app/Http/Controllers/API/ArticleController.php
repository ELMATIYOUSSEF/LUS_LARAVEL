<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('category')->get();
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $article = Article::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article créé avec succès',
            'data' => $article
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = Article::with(['category', 'comments'])->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $article = Article::findOrFail($id);
        $article->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Article mis à jour avec succès',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
    }

    /**
     * Get articles by category.
     */
    public function getByCategory(string $categoryId)
    {
        $articles = Article::where('category_id', $categoryId)->get();
        
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }
}

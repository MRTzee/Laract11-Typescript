<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [NewsController::class, 'index'])->name('index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard',  [NewsController::class, 'show'])->name('dashboard');
    Route::post('/news', [NewsController::class, 'store'])->name('news');
    Route::get('/news', [NewsController::class, 'show'])->name('myNews');
    Route::get('/news/edit', [NewsController::class, 'edit'])->name('edit.news');
    Route::post('/news/update', [NewsController::class, 'update'])->name('update.news');
    Route::post('/news/delete', [NewsController::class, 'destroy'])->name('delete.news');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

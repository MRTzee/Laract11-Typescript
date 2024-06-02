<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::query();
        if ($request->has('search') && $request->search != '') {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('category', 'like', '%' . $request->search . '%');
        }
        $news = $query->OrderByDesc('id')->paginate(8);
        return Inertia::render('Homepage', [
            'title' => 'Cuy Universe | Home',
            'description' => 'Selamat Datang di Cuy Universe News Portal',
            // 'news' => new NewsCollection(News::OrderByDesc('id')->paginate(8)),
            'filters' => new NewsCollection($news)
        ]);
    }

    public function show()
    {
        $myNews = News::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
            'title' => 'Cuy Universe | Home',
        ]);
    }

    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message', 'News has been created');
    }

    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            "myNews" => $news->find($request->id)
        ]);
    }

    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard')->with('message', 'News has been updated');
    }

    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'News has been deleted');
    }
}

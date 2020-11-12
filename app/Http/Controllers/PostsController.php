<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->input('recent')) {   // in case of recent posts
            $posts = Post::with('user')->orderBy('id', 'DESC')->limit(7)->get();
        }
        else {   // else the default case for the admin posts
            $posts = Post::with('user')->orderBy('id', 'DESC')->paginate(10);
         }

         return response()->json(['data' => $posts], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'title' => 'required',
            'content' => 'required',
            'image' => 'required',
        ]);

        $post = new Post();

        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->user_id = auth("api")->user()->id;
        if($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $post->image = $filename;
        }

        $post->save();

        // store tags
        return response()->json(['data' => $post, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);

        $post->prev_post = Post::where('id', '<', $id)->orderBy('id', 'desc')->first();

        $post->next_post = Post::where('id', '>', $id)->first();

        return response()->json(['data' => $post], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $rules = [
            'title' => 'required',
            'content' => 'required',
        ];

        if($post->image == "" || ($post->image != "" && !\File::exists('uploads/' . $post->image))) {
            $rules['image'] = 'required';
        }

        $this->validate($request, $rules);

        $post->title = $request->input('title');

        $post->content = $request->input('content');

        if($request->hasFile('image')) {

            // remove image
            $this->removeImage($post);

            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $post->image = $filename;
        }

        $post->save();
        return response()->json(['data' => $post, 'message' => 'Updated successfully'], 200);
    }

     public function updateLikesCounter(Request $request)
    {
        $post = Post::findOrFail($request->id);
        $post->likes_counter = $post->likes_counter + 1;
        $post->save();
        return response()->json(['data' => $post, 'message' => 'Post Liked!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        // remove image
        $this->removeImage($post);

        $post->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }

    private function removeImage($post)
    {
        if($post->image != "" && !\File::exists('uploads/' . $post->image)) {
            @unlink(public_path('uploads/' . $post->image));
        }
    }
}

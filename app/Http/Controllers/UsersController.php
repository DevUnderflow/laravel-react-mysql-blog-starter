<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate(10);

        return response()->json(['data' => $users], 200);
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
            'name' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        if($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $user->image = $filename;
        }
        $user->save();

        return response()->json(['data' => $user, 'message' => 'Created successfully'], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $user = User::findOrFail($id);

        return response()->json(['data' => $user], 200);
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

        $user = auth("api")->user();

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'password' => ($request->password!=''?'min:6':''),
        ]);
        if($user->image == "" || ($user->image != "" && !\File::exists('uploads/' . $user->image))) {
            $rules['image'] = 'required';
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if($request->has('password') && !empty($request->password)) {
            $user->password = bcrypt($request->password);
        }

        if($request->has('contact_no')) {
            $user->contact_no = $request->contact_no;
        }
        if($request->has('location')) {
            $user->location = $request->location;
        }
        if($request->hasFile('image')) {

            // remove image
            $this->removeImage($user);

            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $user->image = $filename;
        }

        $user->save();

        return response()->json(['data' => $user, 'message' => 'Profile updated successfully'], 200);
    }

    /**
     * view user profile
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        return response()->json(['data' => auth()->user()], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = auth("api")->user();

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'password' => ($request->password!=''?'min:6':''),
        ]);
        if($user->image == "" || ($user->image != "" && !\File::exists('uploads/' . $user->image))) {
            $rules['image'] = 'required';
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if($request->has('password') && !empty($request->password)) {
            $user->password = bcrypt($request->password);
        }

        if($request->has('contact_no')) {
            $user->contact_no = $request->contact_no;
        }
        if($request->has('location')) {
            $user->location = $request->location;
        }
        if($request->hasFile('image')) {

            // remove image
            $this->removeImage($user);

            $file = $request->file('image');

            $filename = time().'-'.uniqid().'.'.$file->getClientOriginalExtension();

            $file->move(public_path('uploads'), $filename);

            $user->image = $filename;
        }

        $user->save();

        return response()->json(['data' => $user, 'message' => 'Profile updated successfully'], 200);
    }

    private function removeImage($user)
    {
        if($user->image != "" && !\File::exists('uploads/' . $user->image)) {
            @unlink(public_path('uploads/' . $user->image));
        }
    }
}

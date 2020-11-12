<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Auth\\LoginController@login')->name('login');
Route::post('register', 'Auth\\RegisterController@register')->name('register');
Route::get('logout', 'Auth\\LoginController@logout')->name('logout');

Route::get('check-auth', 'Auth\\LoginController@checkAuth')->name('logout');
Route::get('profile', 'UsersController@profile');
Route::post('profile/update', 'UsersController@updateProfile');
Route::post('posts/likes', 'PostsController@updateLikesCounter');


Route::resource('posts', 'PostsController');
Route::resource('users', 'UsersController');

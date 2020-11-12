<?php

// Main route
Route::get('/{path?}', function () {
    return view('main');
})->where('path', '.*');

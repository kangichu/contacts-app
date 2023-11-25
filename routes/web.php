<?php
use App\Http\Controllers\ProfileImageUploadController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/dashboard', 'DashboardController@index');

Route::resource('listings', 'ListingsController');

Route::resource('uploads', 'ProfileImageUploadController');

Route::post('/uploading', [ProfileImageUploadController::class, 'store']);

Route::resource('groups', 'GroupController');
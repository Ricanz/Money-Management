<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\CheckingController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\CompleteController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\MasterItemController;
use App\Http\Controllers\MasterTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceAdvisorController;
use App\Models\ServiceAdvisor;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app/index');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/', function () {
    //     return view('sadmin.index');
    // });
});

require __DIR__ . '/auth.php';

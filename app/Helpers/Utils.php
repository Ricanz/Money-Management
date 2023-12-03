<?php

namespace App\Helpers;

use App\Models\Checking;
use App\Models\Client;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Image;

class Utils
{

    public static function uploadImage($image, $width)
    {
        $img = Image::make($image);
        $img->resize($width, null, function ($constraint) {
            $constraint->aspectRatio(); // Maintain aspect ratio
        });
        $img->encode('jpg', 80); // Compress the image (quality: 80%)

        // Generate a unique filename for the processed image
        $processedImageName = time() . '_' . uniqid() . '.jpg';
        // $image->storeAs('images', $processedImageName);
        // $imageUrl = 'storage/images/' . $processedImageName;
        // Save the processed image to storage
        $processedImagePath = 'public/' . $processedImageName;
        Storage::put($processedImagePath, $img->stream());

        // Generate the storage link for the processed image
        $storageLink = Storage::url($processedImagePath);
        return $storageLink;
    }

    public static function uploadImageByLink($image)
    {
        $response = Http::get('https://bukabengkelindonesia.com/assets/theme/images/bbi-ul/images/precheck-standar/'.$image);
        if ($response->successful()) {
            $img = Image::make($response->body());
            $img->resize(300, null, function ($constraint) {
                $constraint->aspectRatio(); // Maintain aspect ratio
            });
            $img->encode('jpg', 80); // Compress the image (quality: 80%)
    
            // Generate a unique filename for the processed image
            $processedImageName = time() . '_' . uniqid() . '.jpg';
            
            $processedImagePath = 'public/' . $processedImageName;
            Storage::put($processedImagePath, $img->stream());
    
            // Generate the storage link for the processed image
            $storageLink = Storage::url($processedImagePath);
            return $storageLink;
        }
    }

    public static function uploadImageByLinkPost($image)
    {
        $response = Http::get('https://bukabengkelindonesia.com/assets/theme/images/bbi-ul/images/postcheck-standar/'.$image);
        if ($response->successful()) {
            $img = Image::make($response->body());
            $img->resize(300, null, function ($constraint) {
                $constraint->aspectRatio(); // Maintain aspect ratio
            });
            $img->encode('jpg', 80); // Compress the image (quality: 80%)
    
            // Generate a unique filename for the processed image
            $processedImageName = time() . '_' . uniqid() . '.jpg';
            
            $processedImagePath = 'public/' . $processedImageName;
            Storage::put($processedImagePath, $img->stream());
    
            // Generate the storage link for the processed image
            $storageLink = Storage::url($processedImagePath);
            return $storageLink;
        }
    }

    public static function generateEmail($name)
    {
        // Menghilangkan spasi dan mengubah huruf menjadi lowercase
        $fullName = strtolower(str_replace(' ', '.', $name));

        // Menghasilkan alamat email dengan format "nama@domain.com"
        $email = $fullName . '@bukbeng.com';

        return $email;
    }

    public static function emptyImage()
    {
        return null;
    }

    public static function generateWo()
    {
        $user = Auth::user();
        $now = Carbon::now();
        $employee = Employee::with('client')->where('user_id', $user->id)->first();
        $lastNumber = Checking::where('client_id', $employee->client->id)->orderByDesc('number')->pluck('number')->first();

        $nextNumber = (int)$lastNumber + 1;

        $formattedNextNumber = sprintf('%06d', $nextNumber);
        $main = 'BBI';
        $current_year = $now->year;
        $client_code = $employee->client->code;

        $finalWo = $main . '-' . $current_year . '-' . $client_code . '-' . $formattedNextNumber;
        return $finalWo;
    }

    public static function generateStaticWo()
    {
        $user = Auth::user();
        $now = Carbon::now();
        $employee = Employee::with('client')->where('user_id', $user->id)->first();
        $lastNumber = Checking::where('client_id', $employee->client->id)->orderByDesc('number')->pluck('number')->first();

        $nextNumber = (int)$lastNumber + 1;

        $formattedNextNumber = sprintf('%06d', $nextNumber);
        $main = 'BBI';
        $current_year = $now->year;
        $client_code = $employee->client->code;

        $finalWo = $main . '-' . $current_year . '-' . $client_code . '-' . $formattedNextNumber;
        return $finalWo;
    }

    public static function check_text($text)
    {
        $string_with_dots = str_replace(',', '.', $text);
        return $string_with_dots;
    }
    
    public static function get_expired($client_id)
    {
        $client = Client::with('kabeng')->where('id', $client_id)->first();
        return $client->expired_at;
    }
}

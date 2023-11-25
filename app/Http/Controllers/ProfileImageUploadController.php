<?php

namespace App\Http\Controllers;

use File;
use Image;
use App\Listing;
use App\ProfileImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProfileImageUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        // Log::info($request->all());
        Log::info($request->all());
        Log::info($request->file('files')[0]);

        // Get the listing
        $listing = Listing::findOrFail($request->query('listing_id'));

        // Check if there's an existing image
        $oldImage = ProfileImageUpload::where('listing_id', $listing->id)->first();

        // Remove the old image if it exists
        if ($oldImage) {
            $oldImagePath = public_path('uploads') . '/' . $oldImage->image_name;
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }

            // Delete the old image record
            $oldImage->delete();
        }

        // Handle file upload
        if ($request->hasFile('files')) {
            $files = $request->file('files');
    
            foreach ($files as $file) {
                $imageName = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads'), $imageName);
    
                // Save the image details in the profile_image_uploads table
                $profileImageUpload = new ProfileImageUpload;
                $profileImageUpload->listing_id = $listing->id;
                $profileImageUpload->image_name = $imageName;
                $profileImageUpload->save();
            }
    
            // Optionally, update the listing's profile image URL or other relevant fields
            // $listing->profile_image_url = 'uploads/' . $imageName;
            // $listing->save();
    
            return response()->json(['success' => 'Images uploaded successfully']);
        } else {
            // Handle the case where no files are present in the request
            return response()->json(['error' => 'No files uploaded.']);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProfileImageUpload  $profileImageUpload
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $listing = Listing::find($id);
        
        return view('profileUpload')->with('listing', $listing);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProfileImageUpload  $profileImageUpload
     * @return \Illuminate\Http\Response
     */
    public function edit(ProfileImageUpload $profileImageUpload)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProfileImageUpload  $profileImageUpload
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProfileImageUpload $profileImageUpload)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProfileImageUpload  $profileImageUpload
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProfileImageUpload $profileImageUpload)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Group;
use App\GroupContact;
use App\Listing;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::get();
        
        return view('allGroups')->with('groups', $groups);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $contacts = Listing::pluck('name', 'id');
        
        return view('createGroup')->with('contacts', $contacts);
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
            'name' => 'required',
        ]);
  
        $group = new Group;
        $group->name    = $request->input('name');
        $group->bio     = $request->input('bio');
        $group->user_id = auth()->user()->id; 

        $group->save();

        if ($request->has('contact')) {
            $selectedContacts = $request->input('contact');

            $group->listings()->attach($selectedContacts);
        }

        return redirect('/dashboard')->with('success', 'Group Added');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::find($id);
        
        return view('showGroup')->with('group', $group);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $group = Group::find($id);

        $contacts = Listing::pluck('name', 'id');

        $selectedContacts = $group->listings->pluck('id')->toArray();

        
        return view('editGroup', compact('group','contacts', 'selectedContacts'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $group = Group::find($id);
        $group->name = $request->input('name');
        $group->bio = $request->input('bio');
        $group->user_id = auth()->user()->id;
        $group->save();

        if ($request->has('contact')) {

            $selectedContacts = $request->input('contact');
            
            $group->listings()->sync($selectedContacts);

        } else {
            $group->listings()->detach();
        }

        return redirect('/dashboard')->with('success', 'Group Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::find($id);
        
        $group->delete();

        return redirect('/dashboard')->with('success', 'Group removed');
    }
}

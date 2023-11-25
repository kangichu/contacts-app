@extends('layouts.app')

@section('content')

<div class="row justify-content-center">
    <div class="d-flex flex-row mb-4 justify-content-between animated fadeInDown">
      <div class="d-flex flex-row justify-content-between mb-2 animated fadeInDown"> 
        <h1 class="jumbotron-heading text-light me-5">
          <span class="float-right">
            <a href="/groups/create" class="btn btn-dark btn-xs">
              <i class="fas fa-plus mr-2"></i>
              GROUP
            </a>
          </span>
        </h1>   
        <h1 class="jumbotron-heading text-light">
          <span class="float-right">
            <a href="/groups" class="btn btn-dark btn-xs">
              <i class="fas fa-eye mr-2"></i>
              GROUPS
            </a>
          </span>
        </h1>        
      </div>
      <div class="mb-2 animated fadeInDown">     
        <h1 class="jumbotron-heading text-light">
          <span class="float-right">
            <a href="/listings/create" class="btn btn-dark btn-xs">
              <i class="fas fa-plus mr-2"></i>
              CONTACT
            </a>
          </span>
        </h1>  
      </div>
    </div>
    <div class="col-md-12 animated fadeInUp">      
        <div class="card">
          <div class="display-4 mt-4 card-header">
             CONTACTS
           </div>
           <div class="card-body">
            @if(count($listings)>0)
              <div class="filter-container mb-6">
                <label for="groupFilter">Filter by Group:</label>
                <input type="text" id="groupFilter" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Enter Group Name"><br>
              
                <label for="nameFilter">Filter by Name:</label>
                <input type="text" id="nameFilter" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Enter Name"><br>
              
                <label for="emailFilter">Filter by Email:</label>
                <input type="text" id="emailFilter" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Enter Email">
              </div>
              <table class="table table-striped" id="myTable">
                <tr>
                  <th>Group</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>
                    <div class="float-right mr-2">
                       Edit / Delete
                    </div>
                  </th>
                </tr>
                @foreach($listings as $listing)
                  <tr>
                    <td>        
                      @if(count($listing->groups) > 0) 
                        @foreach ($listing->groups as $group)
                          <h3>
                            <a href="/groups/{{$group->id}}"> {{ $group->name }} </a>        
                          </h3>    
                        @endforeach  
                      @endif     
                    </td>
                    <td>               
                        <h3>
                          <a href="/listings/{{$listing->id}}" class="d-flex flex-row align-items-center"> 
                            @if ($listing->profileImageUpload)
                            <div class='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                              <div class="symbol-label">
                                <img src="{{ asset('uploads/' . $listing->profileImageUpload->image_name) }}" alt="{{$listing->name}}" class="w-100">
                              </div>
                            </div>
                            @endif
                            {{$listing->name}} 
                          </a>        
                        </h3>            
                    </td>
                    <td>               
                      <h3>
                         <a href="#"> {{$listing->email}} </a>        
                      </h3>            
                    </td>
                    <td>
                      <div class="float-right">
                        <a href="/listings/{{$listing->id}}/edit" class="btn btn-sm btn-warning mr-1">
                            <i class="fas fa-pencil-alt fa-lg"></i>
                        </a>
                        <!--
                        <a href="#" class="btn btn-danger mr-1">
                            <i class="fas fa-trash fa-lg"></i>
                        </a>   
                        -->
                        
                        {!!Form::open(['action' => ['ListingsController@destroy', $listing->id],'method' => 'POST','class' => 'float-right', 'onsubmit' => 'return confirm("Are you sure?")'])!!}
                        {{Form::hidden('_method', 'DELETE')}}
                        {{Form::button('<i class="fas fa-trash fa-lg"></i>', ['type' => 'submit','class' => 'btn btn-danger btn-sm mr-1 float-right'])}}
                        {!! Form::close() !!}            
                                  
                      </div>
                    </td>
                  </tr>
                @endforeach
              </table>
            @endif
            @if(count($listings)==0)
            <span>You have not created any contacts yet.</span>
            @endif
           </div>
        </div>
    </div>
</div>
@endsection

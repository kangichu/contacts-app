@extends('layouts.app')

@section('content')

<div class="row justify-content-center">
    <div class="col-md-12 mb-2 animated fadeInDown">             
        <h1 class="jumbotron-heading text-light">
        <span class="float-right">
           <a href="/dashboard" class="btn btn-dark btn-xs">
            <i class="fas fa-angle-left mr-2"></i>
             GO BACK
           </a>
        </span>
   </h1>  
</div>
    <div class="col-md-12 animated fadeInUp">      
        <div class="card">
          <div class="display-4 mt-4 card-header">
             GROUPS
           </div>
           <div class="card-body">
            @if(count($groups)>0)
              <div class="filter-container mb-7">
                <label for="nameFilter">Filter by Name:</label>
                <input type="text" id="nameFilter" class="form-control form-control-solid mb-7 mb-lg-0" placeholder="Enter Name"><br>
                <label for="bioFilter">Filter by Bio:</label>
                <input type="text" id="bioFilter" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Enter Bio">
              </div>
              <table class="table table-striped" id="myGroupsTable">
                <tr>
                  <th>Name</th>
                  <th>Bio</th>
                  <th>
                    <div class="float-right mr-2">
                       Edit / Delete
                    </div>
                  </th>
                </tr>
                @foreach($groups as $group)
                  <tr>
                    <td>               
                      <h3>
                        <a href="/groups/{{$group->id}}"> {{$group->name}} </a>        
                      </h3>            
                    </td>
                    <td>               
                      <h3>
                         <a href="#"> {{$group->bio}} </a>        
                      </h3>            
                    </td>
                    <td>
                      <div class="float-right">
                        <a href="/groups/{{$group->id}}/edit" class="btn btn-sm btn-warning mr-1">
                            <i class="fas fa-pencil-alt fa-lg"></i>
                        </a>
                        <!--
                        <a href="#" class="btn btn-danger mr-1">
                            <i class="fas fa-trash fa-lg"></i>
                        </a>   
                        -->
                        
                        {!!Form::open(['action' => ['GroupController@destroy', $group->id],'method' => 'POST','class' => 'float-right', 'onsubmit' => 'return confirm("Are you sure?")'])!!}
                        {{Form::hidden('_method', 'DELETE')}}
                        {{Form::button('<i class="fas fa-trash fa-lg"></i>', ['type' => 'submit','class' => 'btn btn-danger btn-sm mr-1 float-right'])}}
                        {!! Form::close() !!}            
                                  
                      </div>
                    </td>
                  </tr>
                @endforeach
              </table>
            @endif
            @if(count($groups)==0)
            <span>You have not created any groups yet.</span>
            @endif
           </div>
        </div>
    </div>
</div>
@endsection

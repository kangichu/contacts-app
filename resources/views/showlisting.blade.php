@extends('layouts.app')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8 mb-2 animated fadeInDown">             
      <h1 class="jumbotron-heading text-light">
         <span class="float-right">
            <a href="/dashboard" class="btn btn-dark btn-xs">
            <i class="fas fa-angle-left mr-2"></i>
            GO BACK
            </a>
         </span>
      </h1>  
    </div> 
    <div class="col-md-8 animated fadeInUp">
        <div class="card">
            <div class="d-flex flex-row justify-content-between pt-4 display-4 card-header">
               <span class="d-flex flex-row align-items-center"> 
                  @if ($listing->profileImageUpload)
                  <div class='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                    <div class="symbol-label">
                      <img src="{{ asset('uploads/' . $listing->profileImageUpload->image_name) }}" alt="{{$listing->name}}" class="w-100">
                    </div>
                  </div>
                  @endif 
                  {{ $listing->name }}
               </span>
               <h1 class="jumbotron-heading text-light">
                  <span class="float-right">
                     <a href="/uploads/{{$listing->id}}" class="btn btn-dark btn-xs">
                     Upload Profile Picture
                     </a>
                  </span>
               </h1>  
            </div>
            <div class="card-body">
           
              <ul class="list-group list-group-flush">
                <li class="list-group-item"> <b>Name : </b>{{ $listing->name }}</li>
                <li class="list-group-item"> <b>Email : </b>{{ $listing->email }}</li>
                <li class="list-group-item"> <b>Phone : </b>{{ $listing->phone }}</li>
                <li class="list-group-item"> <b>Address : </b>{{ $listing->address }}</li>
                <li class="list-group-item"> <b>Info : </b> <br> {{ $listing->bio }}</li>
              </ul>    

            </div>

            
        </div>
    </div>
</div>
@endsection
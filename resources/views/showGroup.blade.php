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
          <div class="display-4 card-header pt-4">
             <i class="far fa-address-card fa-1x me-4"></i>  {{ $group->name }}
           </div>
           <div class="card-body">
           
              <ul class="list-group list-group-flush">
                <li class="list-group-item"> <b>Name : </b>{{ $group->name }}</li>
                <li class="list-group-item"> <b>Info : </b>{{ $group->bio }}</li>
                @if(count($group->listings)> 0) 
                    <li class="list-group-item"> <b>Available Contacts </b></li>
                    @foreach($group->listings as $listing)
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"> <b>Name : </b>{{ $listing->name }}</li>
                            <li class="list-group-item"> <b>Email : </b>{{ $listing->email }}</li>
                            <li class="list-group-item"> <b>Phone : </b>{{ $listing->phone }}</li>
                            <li class="list-group-item"> <b>Address : </b>{{ $listing->address }}</li>
                            <li class="list-group-item"> <b>Info : </b> {{ $listing->bio }}</li>
                            </ul>    
                        </div>
                    @endforeach
                @endif
              </ul>    
               
           </div>
        </div>
    </div>
</div>
@endsection
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
            <div class="pt-4 display-6 card-header">
               Profile Picture for {{ $listing->name }}
            </div>
            <div class="card-body">
                <div id="drag-drop-area" data-listing-id="{{$listing->id}}"></div>
            </div>

            
        </div>
    </div>
</div>
@endsection
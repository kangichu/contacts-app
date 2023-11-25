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
          <div class="display-4 card-header">
             EDIT GROUP
           </div>
           <div class="card-body">
              {!!Form::open(['action' => ['GroupController@update', $group->id],'method' => 'POST'])!!}
                {{Form::bsText('name',$group->name,['placeholder' => 'Company Name'])}}
                {{Form::bsSelect('contact', $contacts, $selectedContacts, ['class' => 'form-control']) }}
                {{Form::bsTextArea('bio',$group->bio,['placeholder' => 'About This Business'])}}
                {{Form::hidden('_method', 'PUT')}}
                {{Form::bsSubmit('SAVE',['class' => 'lead btn btn-primary btn-block'])}}
              {!! Form::close() !!}
           </div>
        </div>
    </div>
</div>
@endsection



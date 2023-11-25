<div class="form-group">
    {{ Form::label($name, null, ['class' => 'control-label']) }}
    {{ Form::select($name.'[]', $options, $value, array_merge(['class' => 'form-control select2', 'style' => 'height: 3em;', 'multiple' => 'multiple'], $attributes)) }}

</div>

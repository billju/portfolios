<template>
<label class="switch">
    <input type="checkbox" :value="value" @change="$emit('input',$event.target.checked)"/>
    <span class="slider"></span>
</label>
</template>

<script>
export default {
    name: 'switcher',
    props: {
      value: Boolean,
    }
}
</script>

<style>
label.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 0;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  padding: 8px;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 3px 3px #2196F3;
}

input:checked + .slider:before {
  left: 26px;
}
</style>
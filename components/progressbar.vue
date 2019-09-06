<template>
<div class="progress">
    <div class="progress-bar"></div>
</div>    
</template>

<script>
export default {
    name: 'progress-bar',
}
</script>

<style scoped>
.progress {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 10px;
  background: #bbdefb;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2196F3;
  animation: progress 1.5s ease-in infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    left: 0;
  }
  60% {
    width: 60%;
    left: 40%;
  }
  100% {
    width: 0%;
    left: 100%;
  }
}
</style>
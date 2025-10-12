<script setup lang="ts"></script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

* {
  box-sizing: border-box;

  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  padding: 0 25px;

  width: 100%;
  min-height: 100vh;
  background-color: #8c21be;

  font-family: 'Raleway', sans-serif;
  color: white;
}
</style>

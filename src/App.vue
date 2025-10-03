<script setup lang="ts"></script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
div {
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

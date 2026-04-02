<script setup lang="ts">
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Auth } from '@/types/model'

const router = useRouter()

const retrievedToken = localStorage.getItem('token')
const token = ref(retrievedToken ?? '')
const setAndPersistToken = (newToken: string) => {
  token.value = newToken
  localStorage.setItem('token', newToken)
}

provide<Auth>('auth', {
  token,
  setAndPersistToken,
})

if (token.value) {
  router.push('/transaction-list')
}
</script>

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

button {
  cursor: pointer;
}

button:disabled {
  cursor: default;
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

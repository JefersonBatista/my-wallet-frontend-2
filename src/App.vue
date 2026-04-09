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
    <div class="app-container">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap');

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

a {
  align-self: center;

  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: white;
}

a.deactive {
  cursor: default;
}

.logo {
  align-self: center;

  font-family: 'Saira Stencil One', cursive;
  font-size: 32px;
  color: white;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  width: 100%;
  min-height: 100vh;
  background-color: #8c21be;

  font-family: 'Raleway', sans-serif;
  color: white;
}

.app-container {
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
}
</style>

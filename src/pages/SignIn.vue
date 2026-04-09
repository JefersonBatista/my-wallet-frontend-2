<script setup lang="ts">
import { useRouter } from 'vue-router'
import api from '@/services/api'
import type { Auth } from '@/types/model'
import { computed, inject, ref } from 'vue'

const router = useRouter()
const formData = ref({
  email: '',
  password: '',
})

const loading = ref(false)

const { setAndPersistToken } = inject<Auth>('auth')!

async function handleSubmit() {
  loading.value = true

  try {
    const response = await api.login(formData.value)
    const token = response.data
    setAndPersistToken(token)

    router.push('/transaction-list')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data)
  } finally {
    loading.value = false
  }
}

const buttonText = computed(() => (loading.value ? 'Entrando...' : 'Entrar'))
const deactiveLink = computed(() => (loading.value ? 'deactive' : ''))
const linkTo = computed(() => (loading.value ? '#' : '/sign-up'))
</script>

<template>
  <section>
    <header class="logo">MyWallet</header>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.email"
        type="email"
        name="email"
        placeholder="E-mail"
        :disabled="loading"
      />
      <input
        v-model="formData.password"
        type="password"
        name="password"
        placeholder="Senha"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        <span class="button-text">{{ buttonText }}</span>
      </button>
    </form>
    <a :class="deactiveLink" :href="linkTo">Primeira vez? Cadastre-se!</a>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  margin: auto 0;

  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 13px;

  margin-top: 24px;
  margin-bottom: 36px;
  width: 100%;
}

.button-text {
  align-self: center;
}

input {
  width: 100%;
  height: 58px;
  padding: 15px;
  border-radius: 5px;
  border-style: none;
  background-color: white;

  font-family: 'Raleway', sans-serif;
  font-size: 20px;
}

input::placeholder {
  font-family: 'Raleway', sans-serif;
}

button {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: #a328d6;

  font-weight: bold;
  font-size: 20px;
  color: white;
}
</style>

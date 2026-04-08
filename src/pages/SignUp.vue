<script setup lang="ts">
import api from '@/services/api'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const loading = ref(false)

async function handleSubmit() {
  loading.value = true

  if (formData.value.password !== formData.value.repeatPassword) {
    alert('Você inseriu senhas diferentes')
    loading.value = false
    return
  }

  const newUserData = {
    name: formData.value.name,
    email: formData.value.email,
    password: formData.value.password,
  }

  try {
    await api.signUp(newUserData)
    router.push('/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data)
  } finally {
    loading.value = false
  }
}

const buttonText = computed(() => (loading.value ? 'Cadastrando...' : 'Cadastrar'))
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.name"
        type="text"
        name="name"
        placeholder="Nome"
        :disabled="loading"
      />
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
      <input
        v-model="formData.repeatPassword"
        type="password"
        name="repeatPassword"
        placeholder="Confirme a senha"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        <span class="button-text">{{ buttonText }}</span>
      </button>
    </form>
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

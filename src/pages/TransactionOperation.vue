<script setup lang="ts">
import api from '@/services/api'
import type { Auth, NewTransaction, TransactionOperationParams } from '@/types/model'
import { computed, inject, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { token } = inject<Auth>('auth')!
const { operation, type, id } = route.params as unknown as TransactionOperationParams
const formData = ref<NewTransaction>({ value: 0, description: '', type })
const loading = ref(true)
const saving = ref(false)

const title = computed(() => {
  let title = ''
  if (operation === 'register') {
    title += 'Nova'
  } else {
    title += 'Editar'
  }
  title += ` ${type === 'incoming' ? 'entrada' : 'saída'}`

  return title
})

const submitButtonText = computed(() => {
  let text = ''

  if (operation === 'register') {
    text += saving.value ? 'Salvando...' : 'Salvar'
  } else {
    text += saving.value ? 'Atualizando...' : 'Atualizar'
  }

  if (!saving.value) {
    text += ` ${type === 'incoming' ? 'entrada' : 'saída'}`
  }

  return text
})

watch(
  [token],
  async () => {
    if (operation === 'register') {
      loading.value = false
      return
    }

    try {
      const response = await api.getTransactionById(token.value, id!)
      const { value, description } = response.data
      formData.value.description = description
      formData.value.value = value

      loading.value = false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response.data)

      router.push('/transaction-list')
    }
  },
  { immediate: true },
)

const handleCreation = async () => {
  saving.value = true

  try {
    await api.registerTransaction(token.value, formData.value)

    router.push('/transaction-list')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data)
  } finally {
    saving.value = false
  }
}

const handleUpdate = async () => {
  saving.value = true

  try {
    await api.updateTransaction(token.value, id!, formData.value)

    router.push('/transaction-list')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data)
  } finally {
    saving.value = false
  }
}

const handleSubmit = operation === 'register' ? handleCreation : handleUpdate
</script>

<template>
  <header v-if="loading">
    <h1>Carregando...</h1>
  </header>

  <section v-else>
    <header>
      <h1>
        {{ title }}
      </h1>
    </header>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.value"
        type="number"
        inputmode="decimal"
        step="0.01"
        name="value"
        placeholder="Valor"
        :disabled="saving"
      />
      <input
        v-model="formData.description"
        type="text"
        name="description"
        placeholder="Descrição"
        :disabled="saving"
      />
      <div class="options">
        <button type="submit" :disabled="saving">
          <span class="button-text">{{ submitButtonText }}</span>
        </button>
        <button type="button" :disabled="saving" @click="router.push('/transaction-list')">
          <span class="button-text">Cancelar</span>
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  width: 100%;
}

header {
  display: flex;
  justify-content: left;
  align-items: center;

  width: 100%;
  height: 96px;
}

h1 {
  font-weight: bold;
  font-size: 26px;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 13px;

  width: 100%;

  .button-text {
    align-self: center;
  }
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

.options {
  display: flex;
  gap: 15px;

  width: 100%;
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

.button-text {
  align-self: center;
}
</style>

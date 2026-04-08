<script setup lang="ts">
import api from '@/services/api'
import type { Auth, Transaction } from '@/types/model'
import { formatAmount, formatTransactionDate } from '@/utils/format'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const { transaction } = defineProps<{
  transaction: Transaction
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const router = useRouter()

const { token } = inject<Auth>('auth')!

const updateTransaction = () =>
  router.push(`/transaction-list/edit/${transaction.type}/${transaction._id}`)

const deleteTransaction = async () => {
  if (!window.confirm(`Deseja mesmo deletar a transação '${transaction.description}'?`)) {
    return
  }

  try {
    await api.deleteTransaction(token.value, transaction._id)
    emit('delete', transaction._id)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data)
  }
}
</script>

<template>
  <article>
    <span class="group">
      <span class="date">{{ formatTransactionDate(transaction.timestamp) }}</span>
      <span class="description" @click="updateTransaction"> {{ transaction.description }} </span>
    </span>
    <span class="group">
      <span :class="transaction.type">{{ formatAmount(transaction.value) }}</span>
      <span class="delete" @click="deleteTransaction"> X </span>
    </span>
  </article>
</template>

<style scoped>
article {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 17px;
}

.group {
  display: flex;
  align-items: center;
}

.date {
  margin-right: 10px;

  color: #c6c6c6;
}

.description {
  color: black;

  cursor: pointer;
}

.incoming {
  margin-left: 10px;
  color: #03ac00;
}

.outgoing {
  margin-left: 10px;
  color: #c70000;
}

.delete {
  margin-left: 10px;

  color: #c6c6c6;

  cursor: pointer;
}
</style>

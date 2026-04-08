<script setup lang="ts">
import type { Transaction } from '@/types/model'
import { formatAmount, formatTransactionDate } from '@/utils/format'
import { useRouter } from 'vue-router'

const { transaction } = defineProps<{
  transaction: Transaction
}>()

const router = useRouter()

const updateTransaction = () =>
  router.push(`/transaction-list/edit/${transaction.type}/${transaction._id}`)
</script>

<template>
  <article>
    <span class="date-and-description">
      <span class="date">{{ formatTransactionDate(transaction.timestamp) }}</span>
      <span class="description" @click="updateTransaction"> {{ transaction.description }} </span>
    </span>
    <span>
      <span :class="transaction.type">{{ formatAmount(transaction.value) }}</span>
      <span class="delete"> X </span>
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

.date-and-description {
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

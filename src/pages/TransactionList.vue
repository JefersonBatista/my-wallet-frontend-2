<script setup lang="ts">
import TransactionItem from '@/components/TransactionItem.vue'
import dayjs from 'dayjs'
import plusIcon from '@/icons/plus.svg'
import minusIcon from '@/icons/minus.svg'
import { inject, ref } from 'vue'
import type { Auth, Transaction } from '@/types/model'
import api from '@/services/api'

const user = ref('')
const transactions = ref<Transaction[]>([])

const { token } = inject<Auth>('auth')!

async function getTransactions() {
  const response = await api.getTransactions(token)
  user.value = response.data.user
  transactions.value = response.data.list.sort((t1, t2) => t2.timestamp - t1.timestamp)
}

getTransactions()

function getBalance() {
  return transactions.value
    .map((transaction) => {
      if (transaction.type === 'incoming') {
        return transaction.value
      } else {
        return -transaction.value
      }
    })
    .reduce((a, b) => a + b, 0)
}

function getBalanceStr() {
  return getBalance()?.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function balanceSignal() {
  if (getBalance() > 0) {
    return 'positive'
  } else if (getBalance() < 0) {
    return 'negative'
  } else {
    return 'neutral'
  }
}

function timestampToLocalDateString(timestamp: number) {
  return dayjs(timestamp).format('DD/MM')
}
</script>

<template>
  <section v-if="user">
    <header>
      <h1>Olá, {{ user }}</h1>
    </header>

    <div class="container">
      <div class="list">
        <TransactionItem
          v-for="item in transactions"
          :key="item._id"
          :date="timestampToLocalDateString(item.timestamp)"
          :description="item.description"
          :value="item.value"
          :type="item.type"
        />
      </div>

      <div class="balance">
        <span class="text">Saldo</span>
        <span :class="balanceSignal()">{{ getBalanceStr() }}</span>
      </div>
    </div>

    <footer>
      <button type="button">
        <img :src="plusIcon" alt="entrada" />
        <span className="button-text">
          Nova
          <br />
          entrada
        </span>
      </button>
      <button type="button">
        <img :src="minusIcon" alt="saída" />
        <span className="button-text">
          Nova
          <br />
          saída
        </span>
      </button>
    </footer>
  </section>

  <header v-else>
    <h1>Carregando...</h1>
  </header>
</template>

<style scoped>
section {
  width: 100%;
}

img {
  width: 24px;
  height: 24px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 78px;
}

h1 {
  font-weight: bold;
  font-size: 26px;
  color: white;
}

.container {
  width: 100%;
  height: calc(100vh - 78px - 143px);
  border-radius: 5px;
  padding: 23px 12px 12px;
  background-color: white;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 17px;

  width: 100%;
  height: calc(100% - 30px);

  overflow-y: auto;

  font-size: 20px;
  color: black;
}

.list .no-transactions-text {
  margin: auto;

  text-align: center;
  color: #868686;
}

.balance {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 30px;
}

.balance span {
  font-size: 19px;
}

.balance .text {
  text-transform: uppercase;
  font-weight: bold;
  color: black;
}

.balance .positive {
  color: #03ac00;
}

.balance .negative {
  color: #c70000;
}

.balance .neutral {
  color: black;
}

footer {
  display: flex;
  gap: 15px;
  align-items: center;

  width: 100%;
  height: 143px;
}

footer .button-text,
footer .button-icon {
  text-align: left;
  align-self: flex-start;
}

button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 114px;
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: #a328d6;

  font-weight: bold;
  font-size: 17px;
  color: white;

  cursor: pointer;
}
</style>

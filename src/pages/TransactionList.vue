<script setup lang="ts">
import TransactionItem from '@/components/TransactionItem.vue'
import dayjs from 'dayjs'
import plusIcon from '@/icons/plus.svg'
import minusIcon from '@/icons/minus.svg'

const user = 'Jeff'

const transactions = [
  {
    _id: '68dafb6340952a4ef639ed89',
    value: 15,
    description: 'Bolo de pote de cenoura',
    type: 'outgoing',
    userId: '62026948e8476d0daf4bc06b',
    timestamp: 1759181667000,
  },
  {
    _id: '68dc76785aee08038ededc15',
    value: 4.8,
    description: 'Seis pães',
    type: 'outgoing',
    userId: '62026948e8476d0daf4bc06b',
    timestamp: 1759278712886,
  },
  {
    _id: '68dc76f55aee08038ededc16',
    value: 15,
    description: '1L de água de coco do Mike',
    type: 'outgoing',
    userId: '62026948e8476d0daf4bc06b',
    timestamp: 1759278837107,
  },
  {
    _id: '68dd7557dfc4e7368c89ab87',
    value: 131,
    description: 'Minha parte na parcela 1/4 da revisão do carro',
    type: 'incoming',
    userId: '62026948e8476d0daf4bc06b',
    timestamp: 1759343959803,
  },
  {
    _id: '68e01c23ff312bccda764e25',
    value: 40,
    description: 'Quatro sacolés gourmet',
    type: 'outgoing',
    userId: '62026948e8476d0daf4bc06b',
    timestamp: 1759517731904,
  },
]

transactions.sort((t1, t2) => t2.timestamp - t1.timestamp)

const balance = transactions
  .map((transaction) => {
    if (transaction.type === 'incoming') {
      return transaction.value
    } else {
      return -transaction.value
    }
  })
  .reduce((a, b) => a + b, 0)

const balanceStr = balance?.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function balanceSignal() {
  if (balance > 0) {
    return 'positive'
  } else if (balance < 0) {
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
  <section>
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
        <span :class="balanceSignal()">{{ balanceStr }}</span>
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

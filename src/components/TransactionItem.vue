<script setup lang="ts">
defineProps(['date', 'description', 'amount', 'type', 'updateTransaction'])
</script>

<template>
  <article>
    <span class="date-and-description">
      <span class="date">{{ date }}</span>
      <span class="description" @click="updateTransaction"> {{ description }} </span>
    </span>
    <span>
      <span :class="type">
        {{ amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
      </span>
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

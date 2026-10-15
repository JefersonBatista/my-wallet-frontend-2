<script setup lang="ts">
import { computed, ref } from 'vue'
import filterListIcon from '@/icons/filter-list.svg'

const description = ref('')
const start = ref(-1)
const end = ref(-1)

const { isFilterLoading, closeFilter } = defineProps<{
  isFilterLoading: boolean
  closeFilter: () => void
}>()

const filterButtonText = computed(() => (isFilterLoading ? 'Filtrando...' : 'Filtrar'))

const emit = defineEmits<{
  filter: [description: string, start: number, end: number]
}>()
</script>

<template>
  <div class="filter-background">
    <div class="filter-container">
      <input
        v-model="description"
        type="text"
        name="description-query"
        placeholder="Filtrar por descrição"
      />
      <input v-model="start" type="date" name="start-date" placeholder="Data inicial" />
      <input v-model="end" type="date" name="end-date" placeholder="Data final" />
      <div class="options">
        <button type="button" @click="emit('filter', description, start, end)">
          <span class="button-text">{{ filterButtonText }}</span>
          <img :src="filterListIcon" alt="filtrar" />
        </button>
        <button type="button" @click="closeFilter">
          <span class="button-text">Cancelar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0, 0, 0, 0.8);
}

.filter-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 80dvh;
  width: 80dvw;
  border-radius: 20px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  background-color: #8c21be;
}

img {
  width: 30px;
  height: 30px;
}

input {
  width: 100%;
  max-width: 400px;
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
  flex-direction: row;
  justify-content: center;
  gap: 15px;

  width: 150px;
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

.options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;

  margin: 20px;
  width: 100%;
}
</style>

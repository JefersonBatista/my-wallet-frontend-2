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
      <input v-model="start" type="number" name="start-date" placeholder="Data inicial" />
      <input v-model="end" type="number" name="end-date" placeholder="Data final" />
      <button type="button" @click="emit('filter', description, start, end)">
        <span class="button-text">{{ filterButtonText }}</span>
        <img :src="filterListIcon" alt="filtrar" />
      </button>
      <button type="button" @click="closeFilter">
        <span class="button-text">Cancelar</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.8);
}

.filter-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 80vh;
  width: 80vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  background-color: green;
}

img {
  width: 30px;
  height: 30px;
}
</style>

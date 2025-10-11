<script setup lang="ts">
const formData = {
  value: 15,
  description: 'Bolo de pote de cenoura',
}
const title = 'Editar entrada'
</script>

<template>
  <section>
    <header>
      <h1>{{ title }}</h1>
    </header>

    <form>
      <input type="number" name="value" placeholder="Valor" :value="formData.value" />
      <input type="text" name="description" placeholder="Descrição" :value="formData.description" />
      <div class="options">
        <button type="submit"><span class="button-text">Salvar</span></button>
        <button type="button"><span class="button-text">Cancelar</span></button>
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

  cursor: pointer;
}

.button-text {
  align-self: center;
}
</style>

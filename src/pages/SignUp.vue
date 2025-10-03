<script setup lang="ts"></script>

<template>
  <section>
    <form>
      <input type="text" name="name" placeholder="Nome" />
      <input type="email" name="email" placeholder="E-mail" />
      <input type="password" name="password" placeholder="Senha" />
      <input type="password" name="repeatPassword" placeholder="Confirme a senha" />
      <button type="submit"><span class="button-text">Entrar</span></button>
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

  cursor: pointer;
}
</style>

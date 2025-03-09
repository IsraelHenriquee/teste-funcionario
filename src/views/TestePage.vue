<template>
  <main class="bg-light">
    <div class="container">
      <div class="card card-accent mt-lg fade-in">
        <div class="card-header">
          <h1 class="text-2xl text-primary">{{ titulo }}</h1>
        </div>
        <div class="card-body">
          <p class="mb-lg">{{ mensagem }}</p>
          
          <div class="input-group">
            <label for="exemplo" class="input-label">Campo de exemplo</label>
            <input id="exemplo" type="text" class="input" placeholder="Digite algo aqui...">
          </div>
          
          <div class="flex gap-md mb-lg">
            <button class="btn btn-primary">Salvar</button>
            <button class="btn btn-outline">Cancelar</button>
          </div>
          
          <div class="card p-md mb-lg">
            <p class="mb-sm">Contador: <span class="text-primary font-bold">{{ contador }}</span></p>
            <div class="flex gap-sm">
              <button @click="incrementar" class="btn btn-sm btn-primary">Incrementar</button>
              <button @click="resetar" class="btn btn-sm btn-secondary">Resetar</button>
            </div>
          </div>
        </div>
        <div class="card-footer flex justify-between items-center">
          <p class="text-sm text-gray">Desenvolvido com Vue 3 + Vite</p>
          <a href="#" class="btn btn-sm btn-outline">Saiba mais</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const titulo = ref('Sistema de Cadastro')
const mensagem = ref('Um sistema moderno e minimalista para gerenciamento de cadastros')
const contador = ref(0)

const incrementar = () => {
  contador.value++
}

const resetar = () => {
  contador.value = 0
}
</script>

<style scoped>
/* Estilos específicos da página, se necessário */
</style>
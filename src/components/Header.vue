<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  titulo: {
    type: String,
    required: true
  }
})
</script>

<template>
  <header class="header">
    <h1 class="titulo">{{ titulo }}</h1>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-white);
  color: var(--text-dark);
  padding: 0 var(--space-lg);
  border-bottom: 1px solid var(--color-gray);
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: var(--shadow-sm);
}

.titulo {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-secondary-dark);
}
</style>

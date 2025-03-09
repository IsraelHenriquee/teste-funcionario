<script setup>
// Componente para a página de Funcionários
import ListaFuncionarios from '../components/ListaFuncionarios.vue';
</script>

<template>
  <div class="funcionarios-container">
    <h2 class="page-title">Lista de Funcionários</h2>
    <div class="content-card">
      <ListaFuncionarios />
    </div>
  </div>
</template>

<style scoped>
.funcionarios-container {
  width: 100%;
}

.page-title {
  margin-bottom: var(--space-lg);
  color: var(--color-secondary-dark);
  text-align: left;
}

.content-card {
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}
</style>

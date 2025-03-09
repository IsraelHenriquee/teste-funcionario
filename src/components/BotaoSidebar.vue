<script setup>
import { defineProps, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  // Texto a ser exibido no botão
  texto: {
    type: String,
    required: true
  },
  // Ícone a ser exibido no botão
  icone: {
    type: Object,
    required: true
  },
  // Rota para navegação
  rota: {
    type: String,
    required: true
  },
  // Se o sidebar está colapsado
  colapsado: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

// Verifica se o botão está ativo (rota atual)
const isActive = computed(() => {
  return route.path === props.rota
})

// Navega para a rota quando clicado
const navegarPara = () => {
  router.push(props.rota)
}
</script>

<template>
  <div 
    class="botao-sidebar" 
    :class="{ 'ativo': isActive, 'colapsado': colapsado }"
    @click="navegarPara"
  >
    <div class="icone">
      <component :is="icone" class="icon-svg" />
    </div>
    <span v-if="!colapsado" class="texto">{{ texto }}</span>
  </div>
</template>

<style scoped>
.botao-sidebar {
  display: flex;
  align-items: center;
  padding: var(--space-md);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  margin-bottom: var(--space-xs);
  color: var(--text-light);
  margin-left: var(--space-sm);
  margin-right: var(--space-sm);
  width: calc(100% - var(--space-sm) * 2);
}

.botao-sidebar:hover {
  background-color: var(--color-dark-gray);
  color: var(--text-light);
}

.botao-sidebar.ativo {
  background-color: var(--color-primary);
  color: white;
}

.icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--space-md);
}

.icon-svg {
  width: 24px;
  height: 24px;
}

.texto {
  font-weight: 500;
  white-space: nowrap;
}

.colapsado .icone {
  margin-right: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .botao-sidebar {
    padding: var(--space-sm);
  }
}
</style>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  // Controla se o modal está visível
  mostrar: {
    type: Boolean,
    default: false
  },
  // Título do modal
  titulo: {
    type: String,
    default: 'Confirmação'
  },
  // Mensagem principal do modal
  mensagem: {
    type: String,
    default: 'Tem certeza que deseja realizar esta ação?'
  },
  // Texto do botão de confirmação
  textoBotaoConfirmar: {
    type: String,
    default: 'Confirmar'
  },
  // Texto do botão de cancelamento
  textoBotaoCancelar: {
    type: String,
    default: 'Cancelar'
  },
  // Tipo do modal (define cores e ícones)
  tipo: {
    type: String,
    default: 'padrao', // padrao, perigo, sucesso, info
    validator: (value) => ['padrao', 'perigo', 'sucesso', 'info'].includes(value)
  }
});

const emit = defineEmits(['confirmar', 'cancelar', 'fechar']);

// Função para confirmar a ação
const confirmar = () => {
  emit('confirmar');
  emit('fechar');
};

// Função para cancelar a ação
const cancelar = () => {
  emit('cancelar');
  emit('fechar');
};

// Função para fechar o modal quando pressionar ESC
const fecharComEsc = (e) => {
  if (e.key === 'Escape' && props.mostrar) {
    cancelar();
  }
};

// Adiciona listener para tecla ESC quando o componente é montado
onMounted(() => {
  document.addEventListener('keydown', fecharComEsc);
});

// Remove listener quando o componente é desmontado
onBeforeUnmount(() => {
  document.removeEventListener('keydown', fecharComEsc);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="mostrar" class="modal-overlay" @click="cancelar">
      <div class="modal-container" :class="[`modal-${tipo}`]" @click.stop>
        <div class="modal-header">
          <h3>{{ titulo }}</h3>
          <button class="modal-fechar" @click="cancelar">&times;</button>
        </div>
        
        <div class="modal-conteudo">
          <p>{{ mensagem }}</p>
        </div>
        
        <div class="modal-acoes">
          <button 
            class="btn-cancelar" 
            @click="cancelar"
          >
            {{ textoBotaoCancelar }}
          </button>
          <button 
            class="btn-confirmar" 
            :class="[`btn-${tipo}`]"
            @click="confirmar"
          >
            {{ textoBotaoConfirmar }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-container {
  background-color: white;
  border-radius: var(--border-radius-md);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text-dark);
}

.modal-fechar {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-light);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.modal-fechar:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.modal-conteudo {
  padding: var(--space-lg) var(--space-md);
  color: var(--color-text);
}

.modal-acoes {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
}

button {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancelar {
  background-color: var(--color-background-light);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-cancelar:hover {
  background-color: var(--color-background);
}

.btn-confirmar {
  background-color: var(--color-primary);
  color: white;
}

.btn-confirmar:hover {
  background-color: var(--color-primary-dark);
}

.btn-perigo {
  background-color: var(--color-danger, #dc3545);
  color: white;
}

.btn-perigo:hover {
  background-color: var(--color-danger-dark, #c82333);
}

.btn-sucesso {
  background-color: var(--color-success, #28a745);
}

.btn-sucesso:hover {
  background-color: var(--color-success-dark, #218838);
}

.btn-info {
  background-color: var(--color-info, #17a2b8);
}

.btn-info:hover {
  background-color: var(--color-info-dark, #138496);
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>

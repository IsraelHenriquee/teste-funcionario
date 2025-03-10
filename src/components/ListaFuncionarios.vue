<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { buscarFuncionarios, excluirFuncionario } from '../services/funcionarioService';
import ModalConfirmacao from './ModalConfirmacao.vue';

const props = defineProps({
  // Permite passar uma lista de funcionários externamente
  funcionariosExternos: {
    type: Array,
    default: () => []
  },
  // Define se deve carregar os dados automaticamente
  carregarAutomaticamente: {
    type: Boolean,
    default: true
  }
});

const router = useRouter();
const emit = defineEmits(['selecionar', 'editar', 'excluir']);

const funcionarios = ref([]);
const carregando = ref(false);
const erro = ref('');

// Estado do modal de confirmação
const mostrarModal = ref(false);
const funcionarioParaExcluir = ref(null);
const excluindo = ref(false);

// Carrega a lista de funcionários
const carregarFuncionarios = async () => {
  // Se foram fornecidos funcionários externos, usa-os
  if (props.funcionariosExternos && props.funcionariosExternos.length > 0) {
    funcionarios.value = props.funcionariosExternos;
    return;
  }
  
  try {
    carregando.value = true;
    erro.value = '';
    
    const resultado = await buscarFuncionarios();
    
    if (resultado.success) {
      funcionarios.value = resultado.data || [];
    } else {
      erro.value = resultado.error || 'Erro ao carregar funcionários';
    }
  } catch (error) {
    erro.value = error.message || 'Erro inesperado ao carregar funcionários';
    console.error('Erro ao carregar funcionários:', error);
  } finally {
    carregando.value = false;
  }
};

// Emite evento quando um funcionário é selecionado
const selecionarFuncionario = (funcionario) => {
  emit('selecionar', funcionario);
};

// Navega para a página de edição quando o botão de editar é clicado
const editarFuncionario = (funcionario, event) => {
  event.stopPropagation();
  
  // Armazena o funcionário no localStorage para recuperá-lo na página de edição
  localStorage.setItem('funcionarioParaEditar', JSON.stringify(funcionario));
  
  // Navega para a página home com query param indicando modo de edição
  router.push({ 
    name: 'home', 
    query: { 
      modo: 'edicao',
      id: funcionario.id
    } 
  });
};

// Exibe o modal informando que não é possível excluir
const mostrarMensagemNaoPodeExcluir = (funcionario, event) => {
  event.stopPropagation();
  funcionarioParaExcluir.value = funcionario;
  mostrarModal.value = true;
};

// Carrega os funcionários automaticamente se a prop estiver ativada
onMounted(() => {
  if (props.carregarAutomaticamente) {
    carregarFuncionarios();
  }
});

// Expõe a função para componentes pais
defineExpose({
  carregarFuncionarios
});
</script>

<template>
  <div class="lista-funcionarios">
    <div v-if="carregando" class="carregando">
      Carregando funcionários...
    </div>
    
    <div v-else-if="erro" class="erro">
      {{ erro }}
      <button @click="carregarFuncionarios" class="btn-retry">
        Tentar novamente
      </button>
    </div>
    
    <div v-else-if="funcionarios.length === 0" class="sem-registros">
      Nenhum funcionário encontrado.
    </div>
    
    <div v-else class="tabela-container">
      <table class="tabela-funcionarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="funcionario in funcionarios" 
            :key="funcionario.id"
            @click="selecionarFuncionario(funcionario)"
            class="linha-funcionario"
          >
            <td class="celula">{{ funcionario.nome }}</td>
            <td class="celula">{{ funcionario.email }}</td>
            <td class="celula">{{ funcionario.telefone || '-' }}</td>
            <td class="celula acoes">
              <button 
                @click="editarFuncionario(funcionario, $event)"
                class="btn-acao btn-editar"
                title="Editar"
              >
                ✏️
              </button>
              <button 
                @click="mostrarMensagemNaoPodeExcluir(funcionario, $event)"
                class="btn-acao btn-excluir"
                title="Excluir"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal informativo que não é possível excluir -->
    <ModalConfirmacao
      :mostrar="mostrarModal"
      titulo="Não é possível deletar"
      mensagem="Não é possível deletar."
      textoBotaoConfirmar="OK"
      :textoBotaoCancelar="null"
      tipo="info"
      @confirmar="mostrarModal = false"
      @fechar="mostrarModal = false"
    />
  </div>
</template>

<style scoped>
.lista-funcionarios {
  width: 100%;
}

.carregando, .erro, .sem-registros {
  padding: var(--space-md);
  text-align: center;
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-md);
}

.carregando {
  background-color: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
}

.erro {
  background-color: rgba(var(--color-error-rgb, 220, 53, 69), 0.1);
  color: var(--color-error, #dc3545);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.sem-registros {
  background-color: rgba(var(--color-gray-rgb, 108, 117, 125), 0.1);
  color: var(--color-gray-dark, #6c757d);
}

.tabela-container {
  overflow-x: auto;
}

.tabela-funcionarios {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.tabela-funcionarios th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.linha-funcionario {
  cursor: pointer;
  transition: background-color 0.3s;
}

.linha-funcionario:hover {
  background-color: #f0f7ff !important;
}

.celula {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.celula:last-child {
  border-right: none;
}

.acoes {
  display: flex;
  gap: var(--space-xs);
  justify-content: flex-end;
}

.btn-acao {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.btn-acao:hover {
  background-color: rgba(var(--color-gray-rgb, 108, 117, 125), 0.1);
}

.btn-retry {
  background-color: var(--color-error, #dc3545);
  color: white;
  border: none;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .celula {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
  
  .acoes {
    flex-direction: column;
    gap: 2px;
  }
}
</style>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { buscarEnderecoPorCep, formatarCep } from '../services/cepService';

const props = defineProps({
  // Define se é um novo cadastro (true) ou edição (false)
  novo: {
    type: Boolean,
    default: true
  },
  // Dados do funcionário para edição
  funcionarioData: {
    type: Object,
    default: () => ({
      id: null,
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cargo: '',
      departamento: '',
      dataAdmissao: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    })
  },
  // Lista de departamentos disponíveis
  departamentosDisponiveis: {
    type: Array,
    default: () => [
      'Administrativo',
      'Financeiro',
      'RH',
      'TI',
      'Comercial',
      'Operacional'
    ]
  }
});

const emit = defineEmits(['salvar', 'cancelar']);

const funcionario = ref({...props.funcionarioData});
const carregandoCep = ref(false);
const erroCep = ref('');

// Atualiza o formulário quando os dados externos mudam
watch(() => props.funcionarioData, (novosDados) => {
  funcionario.value = {...novosDados};
}, { deep: true });

// Inicializa o formulário
onMounted(() => {
  funcionario.value = {...props.funcionarioData};
});

const limparFormulario = () => {
  funcionario.value = {
    id: null,
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  };
  erroCep.value = '';
};

const salvarFuncionario = () => {
  // Emite o evento salvar com os dados do funcionário
  // Inclui o ID se estiver em modo de edição
  emit('salvar', {...funcionario.value});
  
  // Limpa o formulário apenas se for um novo cadastro
  if (props.novo) {
    limparFormulario();
  }
};

const buscarCep = async () => {
  const cep = funcionario.value.cep;
  if (!cep || cep.replace(/\D/g, '').length !== 8) {
    erroCep.value = 'Digite um CEP válido';
    return;
  }
  
  erroCep.value = '';
  carregandoCep.value = true;
  
  try {
    const endereco = await buscarEnderecoPorCep(cep);
    
    // Preenche os campos de endereço com os dados retornados
    funcionario.value.endereco = endereco.endereco || '';
    funcionario.value.bairro = endereco.bairro || '';
    funcionario.value.cidade = endereco.cidade || '';
    funcionario.value.estado = endereco.estado || '';
    
    // Formata o CEP
    funcionario.value.cep = formatarCep(cep);
    
    // Foca no campo de número após preencher o endereço
    setTimeout(() => {
      document.getElementById('numero')?.focus();
    }, 100);
  } catch (error) {
    erroCep.value = 'CEP não encontrado';
    console.error('Erro ao buscar CEP:', error);
  } finally {
    carregandoCep.value = false;
  }
};

// Formata o CEP quando o usuário digita
const formatarCepInput = () => {
  funcionario.value.cep = formatarCep(funcionario.value.cep);
};

const cancelar = () => {
  emit('cancelar');
};
</script>

<template>
  <div class="form-card">
    <div class="form-header">
      <h3 class="section-title">Dados Pessoais</h3>
      <slot name="acoes-header"></slot>
    </div>
    
    <form @submit.prevent="salvarFuncionario">
      <div class="form-row">
        <div class="form-group">
          <label for="nome">Nome Completo</label>
          <input 
            type="text" 
            id="nome" 
            v-model="funcionario.nome" 
            class="form-input" 
            required
            placeholder="Digite o nome completo"
          />
        </div>
        
        <div class="form-group">
          <label for="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            v-model="funcionario.email" 
            class="form-input" 
            required
            placeholder="exemplo@empresa.com"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input 
            type="text" 
            id="cpf" 
            v-model="funcionario.cpf" 
            class="form-input" 
            required
            placeholder="000.000.000-00"
          />
        </div>
        
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input 
            type="tel" 
            id="telefone" 
            v-model="funcionario.telefone" 
            class="form-input" 
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="cargo">Cargo</label>
          <input 
            type="text" 
            id="cargo" 
            v-model="funcionario.cargo" 
            class="form-input" 
            required
            placeholder="Digite o cargo"
          />
        </div>
        
        <div class="form-group">
          <label for="departamento">Departamento</label>
          <select 
            id="departamento" 
            v-model="funcionario.departamento" 
            class="form-input"
            required
          >
            <option value="" disabled selected>Selecione um departamento</option>
            <option v-for="dep in departamentosDisponiveis" :key="dep" :value="dep">
              {{ dep }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group data-group">
          <label for="dataAdmissao">Data de Admissão</label>
          <input 
            type="date" 
            id="dataAdmissao" 
            v-model="funcionario.dataAdmissao" 
            class="form-input" 
            required
          />
        </div>
        <div class="form-group">
          <!-- Espaço vazio para manter o alinhamento -->
        </div>
      </div>
      
      <h3 class="section-title">Endereço</h3>
      
      <div class="form-row">
        <div class="form-group cep-group">
          <label for="cep">CEP</label>
          <div class="input-with-button">
            <input 
              type="text" 
              id="cep" 
              v-model="funcionario.cep" 
              class="form-input" 
              required
              placeholder="00000-000"
              @blur="formatarCepInput"
              :class="{ 'input-error': erroCep }"
            />
            <button 
              type="button" 
              class="btn-icon" 
              @click="buscarCep"
              title="Buscar CEP"
              :disabled="carregandoCep"
            >
              <span v-if="!carregandoCep">🔍</span>
              <span v-else>⌛</span>
            </button>
          </div>
          <small v-if="erroCep" class="error-message">{{ erroCep }}</small>
        </div>
        
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input 
            type="text" 
            id="endereco" 
            v-model="funcionario.endereco" 
            class="form-input" 
            required
            placeholder="Rua, Avenida, etc."
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group numero-group">
          <label for="numero">Número</label>
          <input 
            type="text" 
            id="numero" 
            v-model="funcionario.numero" 
            class="form-input" 
            required
            placeholder="Nº"
          />
        </div>
        
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input 
            type="text" 
            id="bairro" 
            v-model="funcionario.bairro" 
            class="form-input" 
            required
            placeholder="Digite o bairro"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input 
            type="text" 
            id="cidade" 
            v-model="funcionario.cidade" 
            class="form-input" 
            required
            placeholder="Digite a cidade"
          />
        </div>
        
        <div class="form-group estado-group">
          <label for="estado">Estado</label>
          <input 
            type="text" 
            id="estado" 
            v-model="funcionario.estado" 
            class="form-input" 
            required
            placeholder="UF"
            maxlength="2"
            style="text-transform: uppercase;"
          />
        </div>
      </div>
      
      <div class="form-actions">
        <button 
          v-if="!novo" 
          type="button" 
          class="btn btn-secondary" 
          @click="cancelar"
        >
          Cancelar
        </button>
        <button 
          v-else
          type="button" 
          class="btn btn-secondary" 
          @click="limparFormulario"
        >
          Limpar
        </button>
        <button type="submit" class="btn btn-primary">
          {{ novo ? 'Cadastrar' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-card {
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.form-header .section-title {
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: 1.2rem;
  color: var(--color-secondary-dark);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-gray-light);
  padding-bottom: var(--space-sm);
  text-align: left;
}

.form-row {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cep-group {
  flex: 0.4;
}

.estado-group {
  flex: 0.3;
}

.numero-group {
  flex: 0.3;
}

.data-group {
  flex: 0.5;
}

.input-with-button {
  display: flex;
  align-items: center;
}

.input-with-button .form-input {
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-icon {
  height: 40px;
  width: 40px;
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-gray);
  border-left: none;
  border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  transition: background-color 0.2s;
}

.btn-icon:hover:not(:disabled) {
  background-color: var(--color-gray);
}

.btn-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input {
  height: 40px;
  padding: 0 var(--space-sm);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  margin-top: 4px;
}

.form-input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

.input-error {
  border-color: var(--color-error, #dc3545);
}

.error-message {
  color: var(--color-error, #dc3545);
  font-size: 0.8rem;
  margin-top: 4px;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-secondary-dark);
  text-align: left;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.btn {
  height: 40px;
  padding: 0 var(--space-lg);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--text-light);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-gray-light);
  color: var(--text-dark);
}

.btn-secondary:hover {
  background-color: var(--color-gray);
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .cep-group,
  .estado-group,
  .numero-group,
  .data-group {
    flex: 1;
  }
  
  .form-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
}
</style>

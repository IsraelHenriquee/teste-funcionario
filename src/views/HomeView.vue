<script setup>
// Componente para cadastro de funcionário
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import FormularioFuncionario from '../components/FormularioFuncionario.vue';
import { 
  salvarFuncionario as salvarFuncionarioNoSupabase,
  atualizarFuncionario,
  buscarFuncionarioPorId
} from '../services/funcionarioService';
import toast from '../plugins/toast';

const route = useRoute();
const modoEdicao = computed(() => route.query.modo === 'edicao');
const funcionarioId = computed(() => route.query.id ? Number(route.query.id) : null);

const departamentos = [
  'Administrativo',
  'Financeiro',
  'RH',
  'TI',
  'Comercial',
  'Operacional'
];

const salvando = ref(false);
const funcionarioData = ref({
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
});

// Carrega os dados do funcionário se estiver em modo de edição
const carregarFuncionario = async () => {
  if (modoEdicao.value && funcionarioId.value) {
    try {
      // Tenta recuperar do localStorage primeiro (mais rápido)
      const funcionarioSalvo = localStorage.getItem('funcionarioParaEditar');
      
      if (funcionarioSalvo) {
        const dados = JSON.parse(funcionarioSalvo);
        
        // Formata a data de admissão para o formato esperado pelo input date (YYYY-MM-DD)
        if (dados.dataadmissao) {
          // Converte para o formato esperado pelo input date
          const dataObj = new Date(dados.dataadmissao);
          const ano = dataObj.getFullYear();
          const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
          const dia = String(dataObj.getDate()).padStart(2, '0');
          dados.dataAdmissao = `${ano}-${mes}-${dia}`;
          delete dados.dataadmissao;
        }
        
        funcionarioData.value = dados;
        
        // Limpa o localStorage após usar
        localStorage.removeItem('funcionarioParaEditar');
        return;
      }
      
      // Se não encontrar no localStorage, busca do Supabase
      const resultado = await buscarFuncionarioPorId(funcionarioId.value);
      
      if (resultado.success && resultado.data) {
        // Ajusta o nome do campo dataadmissao para dataAdmissao (formato do formulário)
        const dadosAjustados = { ...resultado.data };
        if (dadosAjustados.dataadmissao) {
          // Converte para o formato esperado pelo input date
          const dataObj = new Date(dadosAjustados.dataadmissao);
          const ano = dataObj.getFullYear();
          const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
          const dia = String(dataObj.getDate()).padStart(2, '0');
          dadosAjustados.dataAdmissao = `${ano}-${mes}-${dia}`;
          delete dadosAjustados.dataadmissao;
        }
        
        funcionarioData.value = dadosAjustados;
      } else {
        toast.error('Erro ao carregar dados do funcionário');
      }
    } catch (error) {
      toast.error(`Erro ao carregar dados: ${error.message}`);
      console.error('Erro ao carregar funcionário:', error);
    }
  }
};

const handleSalvarFuncionario = async (funcionario) => {
  try {
    salvando.value = true;
    
    let resultado;
    
    // Verifica se está em modo de edição ou cadastro
    if (modoEdicao.value && funcionarioId.value) {
      resultado = await atualizarFuncionario(funcionarioId.value, funcionario);
      
      if (resultado.success) {
        toast.success('Funcionário atualizado com sucesso!');
      } else {
        toast.error(`Erro ao atualizar: ${resultado.error}`);
      }
    } else {
      resultado = await salvarFuncionarioNoSupabase(funcionario);
      
      if (resultado.success) {
        toast.success('Funcionário cadastrado com sucesso!');
      } else {
        toast.error(`Erro ao cadastrar: ${resultado.error}`);
      }
    }
    
    console.log('Funcionário salvo:', funcionario);
  } catch (error) {
    toast.error(`Erro inesperado: ${error.message}`);
    console.error('Erro inesperado:', error);
  } finally {
    salvando.value = false;
  }
};

// Carrega os dados do funcionário ao montar o componente
onMounted(() => {
  carregarFuncionario();
});
</script>

<template>
  <div class="home-container">
    <h2 class="page-title">{{ modoEdicao ? 'Editar Funcionário' : 'Cadastro de Funcionário' }}</h2>
    
    <FormularioFuncionario
      :novo="!modoEdicao"
      :funcionarioData="funcionarioData"
      :departamentosDisponiveis="departamentos"
      @salvar="handleSalvarFuncionario"
    />
    
    <div v-if="salvando" class="overlay">
      <div class="spinner"></div>
      <p>Salvando...</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  position: relative;
}

.page-title {
  margin-bottom: var(--space-lg);
  color: var(--color-secondary-dark);
  text-align: left;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--color-primary);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-md);
}

.overlay p {
  color: white;
  font-weight: 600;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

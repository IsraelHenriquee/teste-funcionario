import supabase from './supabaseClient';

// Aqui vamos implementar as funções de serviço uma por uma

/**
 * Salva um novo funcionário no Supabase
 * @param {Object} funcionario - Dados do funcionário a ser salvo
 * @returns {Promise} - Promise com o resultado da operação
 */
export const salvarFuncionario = async (funcionario) => {
  try {
    // Cria uma cópia dos dados para ajustar os nomes dos campos
    const dadosAjustados = { ...funcionario };
    
    // Ajusta o nome do campo dataAdmissao para dataadmissao (formato do banco)
    if (dadosAjustados.dataAdmissao) {
      dadosAjustados.dataadmissao = dadosAjustados.dataAdmissao;
      delete dadosAjustados.dataAdmissao;
    }
    
    // Remove o ID se estiver presente e for nulo (para novos cadastros)
    if (dadosAjustados.id === null) {
      delete dadosAjustados.id;
    }
    
    const { data, error } = await supabase
      .from('funcionarios')
      .insert([dadosAjustados]);
    
    if (error) throw error;
    
    return { data, success: true };
  } catch (error) {
    console.error('Erro ao salvar funcionário:', error);
    return { error: error.message, success: false };
  }
};

/**
 * Busca todos os funcionários no Supabase
 * @returns {Promise} - Promise com o resultado da operação
 */
export const buscarFuncionarios = async () => {
  try {
    const { data, error } = await supabase
      .from('funcionarios')
      .select('*');
    
    if (error) throw error;
    
    return { data, success: true };
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    return { error: error.message, success: false };
  }
};

/**
 * Busca um funcionário pelo ID no Supabase
 * @param {number} id - ID do funcionário a ser buscado
 * @returns {Promise} - Promise com o resultado da operação
 */
export const buscarFuncionarioPorId = async (id) => {
  try {
    const { data, error } = await supabase
      .from('funcionarios')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, success: true };
  } catch (error) {
    console.error('Erro ao buscar funcionário por ID:', error);
    return { error: error.message, success: false };
  }
};

/**
 * Atualiza um funcionário existente no Supabase
 * @param {number} id - ID do funcionário a ser atualizado
 * @param {Object} funcionario - Novos dados do funcionário
 * @returns {Promise} - Promise com o resultado da operação
 */
export const atualizarFuncionario = async (id, funcionario) => {
  try {
    // Cria uma cópia dos dados para ajustar os nomes dos campos
    const dadosAjustados = { ...funcionario };
    
    // Ajusta o nome do campo dataAdmissao para dataadmissao (formato do banco)
    if (dadosAjustados.dataAdmissao) {
      dadosAjustados.dataadmissao = dadosAjustados.dataAdmissao;
      delete dadosAjustados.dataAdmissao;
    }
    
    // Remove o ID dos dados a serem atualizados
    if (dadosAjustados.id) {
      delete dadosAjustados.id;
    }
    
    const { data, error } = await supabase
      .from('funcionarios')
      .update(dadosAjustados)
      .eq('id', id);
    
    if (error) throw error;
    
    return { data, success: true };
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    return { error: error.message, success: false };
  }
};

/**
 * Exclui um funcionário do Supabase pelo ID
 * @param {number} id - ID do funcionário a ser excluído
 * @returns {Promise} - Promise com o resultado da operação
 */
export const excluirFuncionario = async (id) => {
  try {
    const { data, error } = await supabase
      .from('funcionarios')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data, success: true };
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    return { error: error.message, success: false };
  }
};
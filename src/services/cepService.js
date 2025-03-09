/**
 * Serviço para busca de CEP
 * Este serviço fornece funções para buscar informações de endereço a partir de um CEP
 * utilizando a API do ViaCEP (https://viacep.com.br/)
 */

/**
 * Busca informações de endereço a partir de um CEP
 * @param {string} cep - O CEP a ser consultado (apenas números ou no formato 00000-000)
 * @returns {Promise} Promise que resolve com os dados do endereço
 */
export async function buscarEnderecoPorCep(cep) {
  try {
    // Remove caracteres não numéricos do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }
    
    // URL da API do ViaCEP
    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar CEP: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verifica se o ViaCEP retornou erro
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    // Formata os dados de acordo com a estrutura esperada pela aplicação
    return {
      cep: data.cep,
      endereco: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
}

/**
 * Formata um CEP para o padrão 00000-000
 * @param {string} cep - O CEP a ser formatado
 * @returns {string} CEP formatado
 */
export function formatarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  
  if (cepLimpo.length !== 8) {
    return cep;
  }
  
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
}

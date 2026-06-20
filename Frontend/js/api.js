import { API_URL } from './config.js';

// Helper central: monta a requisição, checa erros e trata o 204 (sem corpo).
async function request(caminho, opcoes = {}) {
  const resp = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  });

  if (!resp.ok) {
    // tenta extrair a mensagem de erro do backend
    let msg = `Erro ${resp.status}`;
    try {
      const corpo = await resp.json();
      if (corpo && corpo.error) msg = corpo.error;
    } catch (_) { /* resposta sem JSON */ }
    throw new Error(msg);
  }

  // 204 No Content: não há corpo para parsear
  if (resp.status === 204) return null;
  return resp.json();
}

export const api = {
  // ---- Usuario ----
  getUsuario()        { return request('/usuario'); },
  criarUsuario(dados)  { return request('/usuario', { method: 'POST', body: JSON.stringify(dados) }); },
  removerUsuario(id)   { return request(`/usuario/${id}`, { method: 'DELETE' }); },

  // ---- Filme ----
  getFilmes()          { return request('/filme'); },
  criarFilme(dados)    { return request('/filme', { method: 'POST', body: JSON.stringify(dados) }); },
  atualizarFilme(id, dados) { return request(`/filme/${id}`, { method: 'PUT', body: JSON.stringify(dados) }); },
  removerFilme(id)     { return request(`/filme/${id}`, { method: 'DELETE' }); },

  // ---- Avaliação ----
  getAvaliacao()          { return request('/avaliacao'); },
  criarAvaliacao(dados)    { return request('/avaliacao', { method: 'POST', body: JSON.stringify(dados) }); },
  atualizarAvaliacao(id, dados) { return request(`/avaliacao/${id}`, { method: 'PUT', body: JSON.stringify(dados) }); },
  removerAvaliacao(id)     { return request(`/avaliacao/${id}`, { method: 'DELETE' }); },
};

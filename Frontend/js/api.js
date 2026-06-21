import { API_URL } from './config.js';

async function request(caminho, opcoes = {}) {
  const resp = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  });

  let data = null;

  const text = await resp.text();

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = null;
    }
  }

  if (!resp.ok) {
    const msg = data?.error || `Erro ${resp.status}`;
    throw new Error(msg);
  }

  // 204 No Content
  if (resp.status === 204) return null;

  return data;
}

export const api = {
  // ---- Usuario ----
  getUsuario() {
    return request('/usuario');
  },

  criarUsuario(dados) {
    return request('/usuario', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  },

  removerUsuario(id) {
    return request(`/usuario/${id}`, {
      method: 'DELETE'
    });
  },

  // ---- Filme ----
  getFilmes() {
    return request('/filme');
  },

  criarFilme(dados) {
    return request('/filme', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  },

  atualizarFilme(id, dados) {
    return request(`/filme/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  },

  removerFilme(id) {
    return request(`/filme/${id}`, {
      method: 'DELETE'
    });
  },

  // ---- Avaliação ----
  getAvaliacao() {
    return request('/avaliacao');
  },

  criarAvaliacao(dados) {
    return request('/avaliacao', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  },

  atualizarAvaliacao(id, dados) {
    return request(`/avaliacao/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  },

  removerAvaliacao(id) {
    return request(`/avaliacao/${id}`, {
      method: 'DELETE'
    });
  },
};
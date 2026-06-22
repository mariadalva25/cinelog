
import { api } from '../api.js';

export const usuarioService = {
  listarTodas() {
    return api.getUsuario();
  },

  async criar({ nome, email }) {
    if (!nome || !nome.trim()) throw new Error('Nome é obrigatório');
    return api.criarUsuario({
      nome: nome.trim(),
      email: email?.trim() || null,
    });
  },

  remover(id) {
    return api.removerUsuario(id);
  },
};
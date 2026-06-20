
import { api } from '../api.js';

export const filmeService = {
  listarTodas() {
    return api.getFilmes();
  },

  async criar({ titulo, ano, genero }) {
    if (!titulo || !titulo.trim()) throw new Error('Título é obrigatório');
    return api.criarFilme({
      titulo: titulo.trim(),
      ano: ano || null,
      genero: genero?.trim() || null,
    });
  },

  remover(id) {
    return api.removerFilme(id);
  },
};
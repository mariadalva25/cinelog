import { api } from '../api.js';

export const avaliacaoService = {

  listarTodas() {
    return api.getAvaliacao();
  },

  async criarAvaliacao({ nota, comentario, usuarioId, filmeId }) {
    return api.criarAvaliacao({
      nota,
      comentario,
      usuarioId,
      filmeId,
    });
  },

  async atualizarAvaliacao(id, dados) {
    return api.atualizarAvaliacao(id, dados);
  },

  removerAvaliacao(id) {
    return api.removerAvaliacao(id); 
  }
};
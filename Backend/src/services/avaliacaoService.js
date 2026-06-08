import { avaliacaoModel } from '../models/avaliacao.js';

export const avaliacaoService = {
  listarTodos() {
    return avaliacaoModel.listarTodos();
  },

 
  criar({ nota, comentario, usuarioId, filmeId }) {
    // Validação estendida para garantir que todos os campos obrigatórios existem
    if (!nota || !comentario || !usuarioId || !filmeId) {
      const err = new Error('Campos "nota", "comentario", "usuarioId" e "filmeId" são obrigatórios');
      err.status = 400;
      throw err;
    }
 
    return avaliacaoModel.inserir({ nota, comentario, usuarioId, filmeId });
  },

  atualizar(id, dados) {
    const atualizado = avaliacaoModel.atualizar(id, dados);
    if (!atualizado) {
      const err = new Error('Avaliação não encontrada');
      err.status = 404;
      throw err;
    }
    return atualizado;
  },

  remover(id) {
    const removido = avaliacaoModel.remover(id);
    if (!removido) {
      const err = new Error('Avaliação não encontrada');
      err.status = 404;
      throw err;
    }
  },
};

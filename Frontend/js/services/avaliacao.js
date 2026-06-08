import { api } from '../api.js';

export const filmeService = {
  // Lista todos os filmes cadastrados no sistema
  listar() {
    return api.getFilmes();
  },

  // Envia o comentário e a nota do usuário para um filme específico
  async criarComentario({ nota, comentario, usuarioId, filmeId }) {
    // Validações de segurança antes de enviar para a API
    if (!usuarioId) throw new Error('Selecione quem está comentando.');
    if (!filmeId) throw new Error('Selecione o filme.');
    if (nota === '' || nota === null || isNaN(Number(nota))) {
      throw new Error('A nota deve ser um número válido.');
    }
    if (Number(nota) < 0 || Number(nota) > 10) {
      throw new Error('A nota deve ser entre 0 e 10.');
    }
    if (!comentario || comentario.trim() === '') {
      throw new Error('O comentário não pode estar vazio.');
    }

    // Chame a rota correta da sua API para salvar o comentário
    return api.criarComentario({
      comentario: comentario.trim(),
      nota: Number(nota),
      usuarioId: Number(usuarioId),
      filmeId: Number(filmeId),
    });
  },

  // Atualiza apenas o texto do comentário ou nota se necessário
  async atualizarComentario(id, { comentario, nota }) {
    const dadosAtualizados = {};
    
    if (comentario) dadosAtualizados.comentario = comentario.trim();
    if (nota !== undefined) dadosAtualizados.nota = Number(nota);

    return api.atualizarComentario(id, dadosAtualizados);
  },

  // Remove um comentário através do ID dele
  removerComentario(id) {
    return api.removerComentario(id);
  },
};

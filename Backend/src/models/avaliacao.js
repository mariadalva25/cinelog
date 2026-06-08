let avaliacao = [];
let nextId = 1;

export const avaliacaoModel = {
  listarTodos() {
    return avaliacao;
  },

  buscarPorId(id) {
    return avaliacao.find(a => a.id === id) || null;
  },

  inserir({nota,comentario,usuarioId,filmeId}) {
    const novo = { id: nextId++, nota, comentario, usuarioId, filmeId };
    avaliacao.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const idx = avaliacao.findIndex(a => a.id === id);
    if (idx === -1) return null;
    avaliacao[idx] = { ...avaliacao[idx], ...dados, id };
    return avaliacao[idx];
  },

  remover(id) {
    const tamanhoAntes = avaliacao.length;
    avaliacao = avaliacao.filter(a => a.id !== id);
    return avaliacao.length < tamanhoAntes;
  },
};

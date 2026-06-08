let filme = [];
let nextId = 1;

export const filmeModel = {
  listarTodos() {
    return filme;
  },

  buscarPorId(id) {
    return filme.find(f => f.id === id) || null;
  },

  inserir({ titulo, ano, genero }) {
    const novo = { id: nextId++, titulo, ano: Number(ano), genero: genero || null };
    filme.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const idx = filme.findIndex(f => f.id === id);
    if (idx === -1) return null;
    filme[idx] = { ...filme[idx], ...dados, id };
    return filme[idx];
  },

  remover(id) {
    const tamanhoAntes = filme.length;
    filme = filme.filter(f => f.id !== id);
    return filme.length < tamanhoAntes;
  },
};

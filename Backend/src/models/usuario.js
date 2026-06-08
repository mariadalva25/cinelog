let usuario = [];
let nextId = 1;

export const usuarioModel = {
  listarTodos() {
    return usuario;
  },

  buscarPorId(id) {
    return usuario.find(c => c.id === id) || null;
  },

  existeEmail(email) {
    return usuario.some(c => c.email === email);
  },

  inserir({ nome,email }) {
    const novo = { id: nextId++, nome, email: email || null };
    usuario.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const idx = usuario.findIndex(c => c.id === id);
    if (idx === -1) return null;
    usuario[idx] = { ...usuario[idx], ...dados, id }; // id nunca muda
    return usuario[idx];
  },

  remover(id) {
    const tamanhoAntes = usuario.length;
    usuario = usuario.filter(c => c.id !== id);
    return usuario.length < tamanhoAntes; // true = removeu
  },
};
import { usuarioModel } from '../models/usuario.js';

export const usuarioService = {
  listarTodos() {
    return usuarioModel.listarTodos();
  },

  buscarPorId(id) {
    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    }
    return usuario;
  },

  criar({ nome, email }) {
    if (!nome || !email) {
      const err = new Error('Campos "nome" e "email" são obrigatórios');
      err.status = 400;
      throw err;
    }

 
    if (usuarioModel.existeEmail(email)) {
      const err = new Error('Já existe um usuário com este email');
      err.status = 409;
      throw err;
    }

    return usuarioModel.inserir({ nome, email });
  },

  atualizar(id, dados) {
    const atualizado = usuarioModel.atualizar(id, dados);
    if (!atualizado) {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    }
    return atualizado;
  },

  remover(id) {
    const removido = usuarioModel.remover(id);
    if (!removido) {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    }
  },
};
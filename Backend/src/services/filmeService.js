import { filmeModel } from '../models/filme.js';

export const filmeService = {

  listarTodas(filmeId) {
    if (filmeId) {
      return filmeModel.buscarPorId(Number(filmeId));
    }
    return filmeModel.listarTodas(); 
   },

  buscarPorId(id) {
    const filme = filmeModel.buscarPorId(id);
    if (!filme) {
      const err = new Error('Filme não encontrado');
      err.status = 404;
      throw err;
    }
    return filme;
  },

 
  criar({ titulo, ano, genero }) {
    if (!titulo || !ano || !genero) {
      const err = new Error('Campos "titulo", "ano" e "genero" são obrigatórios');
      err.status = 400;
      throw err;
    }

   
    return filmeModel.inserir({ titulo, ano, genero });
  },

  atualizar(id, dados) {
    const atualizada = filmeModel.atualizar(id, dados);
    if (!atualizada) {
      const err = new Error('Filme não encontrado');
      err.status = 404;
      throw err;
    }
    return atualizada;
  },

  remover(id) {
    const removida = filmeModel.remover(id);
    if (!removida) {
      const err = new Error('Filme não encontrado');
      err.status = 404;
      throw err;
    }
    return true;
  },
};

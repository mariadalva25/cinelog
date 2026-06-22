import { filmeService } from '../services/filmeService.js';

export const filmeController = {
  listarTodas(req, res) {
    const filmes = filmeService.listarTodas(req.query.filmeId);
    res.json(filmes);
  },

  buscarPorId(req, res) {
    const filme = filmeService.buscarPorId(Number(req.params.id));
    res.json(filme);
  },

  criar(req, res) {
    const novo = filmeService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    const atualizada = filmeService.atualizar(Number(req.params.id), req.body);
    res.json(atualizada);
  },

  remover(req, res) {
    filmeService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
import { avaliacaoService } from '../services/avaliacaoService.js';

export const avaliacaoController = {
  listarTodas(req, res) {
    const avaliacao =avaliacaoService.listarTodas();
    res.json(avaliacao);
  },


  buscarPorId(req, res) {
    const avaliacao = avaliacaoService.buscarPorId(Number(req.params.id));
    res.json(avaliacao);
  },

  criar(req, res) {
    const novo = avaliacaoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    const atualizada = avaliacaoService.atualizar(Number(req.params.id), req.body);
    res.json(atualizada);
  },

  remover(req, res) {
    avaliacaoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
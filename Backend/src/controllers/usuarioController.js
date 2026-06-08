import { usuarioService } from '../services/usuarioService.js';

export const usuarioController = {
  listarTodos(req, res) {
    const usuarios = usuarioService.listarTodos();
    res.json(usuarios);
  },

  buscarPorId(req, res) {
    const usuario = usuarioService.buscarPorId(Number(req.params.id));
    res.json(usuario);
  },

  criar(req, res) {
    const novo = usuarioService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    const atualizado = usuarioService.atualizar(Number(req.params.id), req.body);
    res.json(atualizado);
  },

  remover(req, res) {
    usuarioService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
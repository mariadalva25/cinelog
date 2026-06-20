import { db } from '../db.js';

export const usuarioModel = {
  listarTodas() {
    return db.prepare('SELECT * FROM usuario').all();
  },
  buscarPorId(id) {
    return db.prepare('SELECT * FROM usuario WHERE id = ?').get(id) || null;
  },

  existeEmail(email) {
    return db.prepare('SELECT * FROM usuario WHERE email = ?').get(email) || null;
  },

  inserir({ nome,email }) {
   const r = db.prepare(
      'INSERT INTO usuario (nome, email) VALUES (?, ?)'
    ).run(nome, email ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
  const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados, id };
    db.prepare(
      'UPDATE usuario SET nome = ?, email = ? WHERE id = ?'
    ).run(novo.nome, novo.email ?? null, id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM usuario WHERE id = ?').run(id);
    return r.changes > 0; 
  },
};
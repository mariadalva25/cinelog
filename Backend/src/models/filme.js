import { db } from '../db.js';

export const filmeModel = {
  listarTodas() {
    return db.prepare('SELECT * FROM filme').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM filme WHERE id = ?').get(id) || null;
  },

  inserir({ titulo, ano, genero }) {
    const r = db.prepare(
      `INSERT INTO filme (titulo, ano, genero, criada_em)
       VALUES (?, ?, ?, ?)`
    ).run(
      titulo,
      Number(ano),
      genero || null,
      new Date().toISOString()
    );

    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;

    const novo = { ...atual, ...dados, id };

    db.prepare(
      'UPDATE filme SET titulo = ?, ano = ?, genero = ? WHERE id = ?'
    ).run(
      novo.titulo,
      novo.ano,
      novo.genero ?? null,
      id
    );

    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM filme WHERE id = ?').run(id);
    return r.changes > 0;
  },
};
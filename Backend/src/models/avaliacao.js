import { db } from '../db.js';

export const avaliacaoModel = {

 listarTodas() {
  return db.prepare(`
    SELECT 
      id,
      nota,
      comentario,
      usuario_id AS usuarioId,
      filme_id AS filmeId,
      criada_em
    FROM avaliacao
  `).all();
},
  buscarPorId(id) {
    return db.prepare(`
      SELECT 
        id,
        nota,
        comentario,
        usuario_id AS usuarioId,
        filme_id AS filmeId,
        criada_em
      FROM avaliacao
      WHERE id = ?
    `).get(id) || null;
  },

  inserir({ nota, comentario, usuarioId, filmeId }) {
    const safeComentario = comentario.replace(/'/g, "''");

    db.exec(`
      INSERT INTO avaliacao (nota, comentario, usuario_id, filme_id, criada_em)
      VALUES (${nota}, '${safeComentario}', ${usuarioId}, ${filmeId}, datetime('now'))
    `);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;

    const comentario = dados.comentario
      ? dados.comentario.replace(/'/g, "''")
      : atual.comentario;

    const nota = dados.nota ?? atual.nota;

    db.exec(`
      UPDATE avaliacao
      SET nota = ${nota},
          comentario = '${comentario}'
      WHERE id = ${id}
    `);

    return this.buscarPorId(id);
  },

  remover(id) {
    db.exec(`DELETE FROM avaliacao WHERE id = ${id}`);
    return true;
  }
};
import { DatabaseSync } from 'node:sqlite';

export const db = new DatabaseSync('banco.db');

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS filme (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    ano INTEGER NOT NULL,
    genero TEXT NOT NULL,
    criada_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS avaliacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nota REAL NOT NULL,
    comentario TEXT NOT NULL,
    usuario_id INTEGER NOT NULL,
    filme_id INTEGER NOT NULL,
    criada_em TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (filme_id) REFERENCES filme(id)
  );
`);
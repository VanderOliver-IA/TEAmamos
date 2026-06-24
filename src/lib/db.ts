import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "teamamos.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const fs = require("fs");
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS colaboradores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT,
        cidade TEXT,
        perfil TEXT NOT NULL,
        relacao_tea TEXT,
        idade_tea TEXT,
        nivel_suporte TEXT,
        aceita_entrevista INTEGER DEFAULT 0,
        aceita_beta INTEGER DEFAULT 0,
        aceita_atualizacoes INTEGER DEFAULT 1,
        aceita_termos INTEGER DEFAULT 0,
        criado_em TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS contribuicoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        colaborador_id INTEGER NOT NULL,
        maior_dificuldade TEXT,
        dificuldade_texto TEXT,
        recurso_desejado TEXT,
        apps_usados TEXT,
        o_que_funcionou TEXT,
        o_que_nao_funcionou TEXT,
        funcionalidade_indispensavel TEXT,
        criado_em TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id)
      );
    `);
  }

  return db;
}

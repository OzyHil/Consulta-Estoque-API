const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Banco de dados SQLite conectado");

    // Criar tabelas
    db.run(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL,
        nome TEXT NOT NULL,
        imagemUrl TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS centro_de_custos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS departamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS transferencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT NOT NULL
      )
    `);
  }
});

module.exports = db;

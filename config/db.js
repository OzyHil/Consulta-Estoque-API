const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Banco de dados SQLite conectado");
    
    // Habilitar chaves estrangeiras
    db.run("PRAGMA foreign_keys = ON");

    // Criar tabelas
    db.run(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        imagemUrl TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS centro_de_custos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS departamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS transferencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS requisicoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codEmpresa TEXT NOT NULL,
        codigoPRO TEXT NOT NULL,
        codigoDer TEXT NOT NULL,
        codigoDepartamento TEXT NOT NULL,
        dataMovimentada TEXT NOT NULL,
        sequenciaMovimento TEXT NOT NULL,
        codigoTransferencia TEXT NOT NULL,
        numeroDocumento TEXT NOT NULL,
        OBSMVP TEXT NOT NULL,
        quatidadeMovimento TEXT NOT NULL,
        valorMovimentado TEXT NOT NULL,
        usuarioResponsavel TEXT NOT NULL,
        usuarioRecebedor TEXT NOT NULL,
        FOREIGN KEY (codEmpresa) REFERENCES empresas(codigo),
        FOREIGN KEY (codigoPRO) REFERENCES produtos(codigo),
        FOREIGN KEY (codigoDer) REFERENCES centro_de_custos(codigo),
        FOREIGN KEY (codigoDepartamento) REFERENCES departamentos(codigo),
        FOREIGN KEY (codigoTransferencia) REFERENCES transferencias(codigo)
      )
    `);
  }
});

module.exports = db;
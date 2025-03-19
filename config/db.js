const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

// Função para criar o banco de dados do zero
function setupDatabase() {
  // Verificar se o diretório existe, se não, criar
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
  }

  // Conectar ao banco de dados
  const db = new sqlite3.Database("./data/database.db", (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }

    console.log("Banco de dados SQLite conectado");

    // Desativar temporariamente as chaves estrangeiras
    db.run("PRAGMA foreign_keys = OFF", [], (err) => {
      if (err) console.error("Erro ao desativar chaves estrangeiras:", err);

      // Função para executar queries sequencialmente
      function runQuery(queries, index = 0) {
        if (index >= queries.length) {
          // Todas as queries foram executadas, reativar chaves estrangeiras
          db.run("PRAGMA foreign_keys = ON", [], (err) => {
            if (err) console.error("Erro ao reativar chaves estrangeiras:", err);
            console.log("Configuração do banco de dados concluída");
          });
          return;
        }

        const query = queries[index];
        db.run(query, [], (err) => {
          if (err) {
            console.error(`Erro ao executar query ${index}:`, err);
            console.error("Query:", query);
          } else {
            console.log(`Query ${index} executada com sucesso`);
          }
          // Continuar para a próxima query
          runQuery(queries, index + 1);
        });
      }

      // Lista de queries para criar tabelas na ordem correta
      const queries = [
        // Primeiro, dropar tabelas se existirem (em ordem inversa de dependência)
        // "DROP TABLE IF EXISTS requisicoes",
        // "DROP TABLE IF EXISTS transferencias",
        // "DROP TABLE IF EXISTS departamentos",
        // "DROP TABLE IF EXISTS centro_de_custos",
        // "DROP TABLE IF EXISTS empresas",
        // "DROP TABLE IF EXISTS produtos",

        // `CREATE TABLE produtos (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigo TEXT NOT NULL UNIQUE,
        //   nome TEXT NOT NULL,
        //   imagemUrl TEXT
        // )`,

        // `CREATE TABLE empresas (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigo TEXT NOT NULL UNIQUE,
        //   nome TEXT NOT NULL
        // )`,

        // `CREATE TABLE centro_de_custos (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigo TEXT NOT NULL UNIQUE,
        //   nome TEXT NOT NULL
        // )`,

        // `CREATE TABLE departamentos (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigo TEXT NOT NULL UNIQUE,
        //   nome TEXT NOT NULL
        // )`,
        `DELETE FROM requisicoes;`,
        `DELETE FROM sqlite_sequence WHERE name='requisicoes';`,

        // `CREATE TABLE transferencias (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigo TEXT NOT NULL UNIQUE,
        //   nome TEXT NOT NULL
        // )`,

        // `CREATE TABLE requisicoes (
        //   id INTEGER PRIMARY KEY AUTOINCREMENT,
        //   codigoEmpresa TEXT NOT NULL,
        //   codigoProduto TEXT NOT NULL,
        //   codigoDerivacao TEXT,
        //   codigoDepartamento TEXT NOT NULL,
        //   dataMovimentada TEXT NOT NULL,
        //   sequenciaMovimento TEXT,
        //   codigoTransferencia TEXT NOT NULL,
        //   numeroDocumento TEXT,
        //   observacaoMovimento TEXT,
        //   quatidadeMovimento TEXT,
        //   valorMovimentado TEXT,
        //   usuarioResponsavel TEXT NOT NULL,
        //   usuarioRecebedor TEXT NOT NULL,
        //   FOREIGN KEY (codigoEmpresa) REFERENCES empresas(codigo),
        //   FOREIGN KEY (codigoProduto) REFERENCES produtos(codigo),
        //   FOREIGN KEY (codigoDepartamento) REFERENCES departamentos(codigo),
        //   FOREIGN KEY (codigoTransferencia) REFERENCES transferencias(codigo)
        // )`
      ];

      // Iniciar a execução das queries
      runQuery(queries);
    });
  });

  return db;
}

// Exportar a instância do banco de dados
const db = setupDatabase();
module.exports = db;
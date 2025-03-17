const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');
const jsonData = require('./db.json');

// Função para inserir dados nas tabelas
const insertData = () => {
  // Use promises to track when all operations are complete
  const promises = [];

  // Inserir dados da tabela 'produtos'
  jsonData.produtos.forEach((produto) => {
    promises.push(new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO produtos (codigo, nome, imagemUrl) VALUES (?, ?, ?)`,
        [produto.codigo, produto.nome, produto.imagemUrl],
        (err) => {
          if (err) {
            console.error('Erro ao inserir produto:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    }));
  });

  // Inserir dados da tabela 'empresas'
  jsonData.empresas.forEach((empresa) => {
    promises.push(new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO empresas (codigo, nome) VALUES (?, ?)`,
        [empresa.codigo, empresa.nome],
        (err) => {
          if (err) {
            console.error('Erro ao inserir empresa:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    }));
  });

  // Inserir dados da tabela 'centro_de_custos'
  jsonData.centro_de_custos.forEach((centro) => {
    promises.push(new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO centro_de_custos (codigo, nome) VALUES (?, ?)`,
        [centro.codigo, centro.nome],
        (err) => {
          if (err) {
            console.error('Erro ao inserir centro de custo:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    }));
  });

  // Inserir dados da tabela 'departamentos'
  jsonData.departamentos.forEach((departamento) => {
    promises.push(new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO departamentos (codigo, nome) VALUES (?, ?)`,
        [departamento.codigo, departamento.nome],
        (err) => {
          if (err) {
            console.error('Erro ao inserir departamento:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    }));
  });

  // Inserir dados da tabela 'transferencias'
  jsonData.transferencias.forEach((transferencia) => {
    promises.push(new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transferencias (codigo, nome) VALUES (?, ?)`,
        [transferencia.codigo, transferencia.nome],
        (err) => {
          if (err) {
            console.error('Erro ao inserir transferencia:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    }));
  });

  // Wait for all operations to complete
  return Promise.all(promises).then(() => {
    return new Promise((resolve) => {
      db.close(() => {
        console.log('Dados inseridos com sucesso!');
        resolve();
      });
    });
  }).catch(err => {
    console.error('Erro durante a inserção:', err);
    db.close();
  });
};

// If running this file directly (not imported)
if (require.main === module) {
  insertData().then(() => {
    console.log("Script completed successfully");
  }).catch(err => {
    console.error("Script failed:", err);
  });
}

module.exports = insertData;
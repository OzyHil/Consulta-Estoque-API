// utils/insertData.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../data/database.db'); // Caminho do banco de dados
const jsonData = require('./db.json'); // Caminho para o arquivo JSON com os dados

// Função para inserir dados nas tabelas
const insertData = () => {
  // Inserir dados da tabela 'produtos'
  jsonData.produtos.forEach((produto) => {
    db.run(
      `INSERT INTO produtos (codigo, nome, imagemUrl) VALUES (?, ?, ?)`,
      [produto.codigo, produto.nome, produto.imagemUrl],
      (err) => {
        if (err) {
          console.error('Erro ao inserir produto:', err);
        }
      }
    );
  });

  // Inserir dados da tabela 'empresas'
  jsonData.empresas.forEach((empresa) => {
    db.run(
      `INSERT INTO empresas (codigo, nome) VALUES (?, ?)`,
      [empresa.codigo, empresa.nome],
      (err) => {
        if (err) {
          console.error('Erro ao inserir empresa:', err);
        }
      }
    );
  });

  // Inserir dados da tabela 'centro_de_custos'
  jsonData.centro_de_custos.forEach((centro) => {
    db.run(
      `INSERT INTO centro_de_custos (codigo, nome) VALUES (?, ?)`,
      [centro.codigo, centro.nome],
      (err) => {
        if (err) {
          console.error('Erro ao inserir centro de custo:', err);
        }
      }
    );
  });

  // Inserir dados da tabela 'departamentos'
  jsonData.departamentos.forEach((departamento) => {
    db.run(
      `INSERT INTO departamentos (codigo, nome) VALUES (?, ?)`,
      [departamento.codigo, departamento.nome],
      (err) => {
        if (err) {
          console.error('Erro ao inserir departamento:', err);
        }
      }
    );
  });

  // Inserir dados da tabela 'transferencias'
  jsonData.transferencias.forEach((transferencia) => {
    db.run(
      `INSERT INTO transferencias (codigo, nome) VALUES (?, ?)`,
      [transferencia.codigo, transferencia.nome],
      (err) => {
        if (err) {
          console.error('Erro ao inserir transferencia:', err);
        }
      }
    );
  });

  db.close(() => {
    console.log('Dados inseridos com sucesso!');
  });
};

module.exports = insertData; // Exportando a função para reutilização
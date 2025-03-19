const db = require("../config/db");

// Obter todas as requisições
exports.getAllRequisicao = (req, res) => {
  db.all("SELECT * FROM requisicoes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.getRequisicoesPorIntervaloDeData = (req, res) => {
  const { dataInicial, dataFinal } = req.query;

  if (!dataInicial || !dataFinal) {
    return res.status(400).json({ error: "Parâmetros dataInicial e dataFinal são obrigatórios." });
  }

  const query = `
      SELECT * FROM requisicoes
      WHERE dataMovimentada BETWEEN ? AND ?
    `;

  db.all(query, [dataInicial, dataFinal], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.addRequisicoes = (req, res) => {
  try {
    const requisicoes = req.body;
  
    if (!Array.isArray(requisicoes) || requisicoes.length === 0) {
      return res.status(400).json({ error: 'Deve ser enviado um array não vazio de requisições' });
    }
    
    // Verificar se todas as transferências existem
    const codigosTransferencia = [...new Set(requisicoes.map(r => r.codigoTransferencia))];
    
    // Construir query com placeholder para cada código
    const placeholders = codigosTransferencia.map(() => '?').join(',');
    const checkQuery = `SELECT codigo FROM transferencias WHERE codigo IN (${placeholders})`;
    
    db.all(checkQuery, codigosTransferencia, (err, rows) => {
      if (err) {
        console.error("Erro ao verificar transferências:", err);
        return res.status(500).json({ error: 'Erro ao verificar transferências', details: err.message });
      }
      
      const codigosExistentes = new Set(rows.map(row => row.codigo));
      const codigosFaltando = codigosTransferencia.filter(codigo => !codigosExistentes.has(codigo));
      
      if (codigosFaltando.length > 0) {
        // Adicionar as transferências faltantes automaticamente
        console.log(`Adicionando ${codigosFaltando.length} transferências faltantes...`);
        
        const insertStmt = db.prepare("INSERT INTO transferencias (codigo, nome) VALUES (?, ?)");
        
        codigosFaltando.forEach(codigo => {
          insertStmt.run(codigo, `Transferência ${codigo}`);
        });
        
        insertStmt.finalize();
      }
      
      // Agora podemos prosseguir com a inserção das requisições
      const insertQuery = `
        INSERT INTO requisicoes (
          codigoEmpresa, codigoProduto, codigoDerivacao, codigoDepartamento,
          dataMovimentada, sequenciaMovimento, codigoTransferencia,
          numeroDocumento, observacaoMovimento, quatidadeMovimento, valorMovimentado,
          usuarioResponsavel, usuarioRecebedor
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      let errorCount = 0;
      let successCount = 0;
      
      db.serialize(() => {
        // Começar uma transação
        db.run("BEGIN TRANSACTION");
        
        const stmt = db.prepare(insertQuery);
        
        requisicoes.forEach((requisicao, index) => {
          try {
            stmt.run(
              requisicao.codigoEmpresa || null, 
              requisicao.codigoProduto || null, 
              requisicao.codigoDerivacao || null, 
              requisicao.codigoDepartamento || null, 
              requisicao.dataMovimentada || null, 
              requisicao.sequenciaMovimento || null, 
              requisicao.codigoTransferencia || null, 
              requisicao.numeroDocumento || null, 
              requisicao.observacaoMovimento || null, 
              requisicao.quatidadeMovimento || null, 
              requisicao.valorMovimentado || null, 
              requisicao.usuarioResponsavel || null, 
              requisicao.usuarioRecebedor || null
            );
            successCount++;
          } catch (insertErr) {
            console.error(`Erro ao inserir requisição ${index}:`, insertErr);
            errorCount++;
          }
        });
        
        stmt.finalize();
        
        // Finalizar a transação
        db.run("COMMIT", [], (commitErr) => {
          if (commitErr) {
            console.error("Erro ao finalizar transação:", commitErr);
            return res.status(500).json({ 
              error: 'Erro ao finalizar transação', 
              details: commitErr.message 
            });
          }
          
          res.status(201).json({ 
            message: 'Processamento concluído', 
            success: successCount, 
            errors: errorCount,
            transferenciasAdicionadas: codigosFaltando
          });
        });
      });
    });
  } catch (err) {
    console.error("Erro geral em addRequisicoes:", err);
    res.status(500).json({ error: 'Erro ao processar requisição', details: err.message });
  }
};
const db = require("../config/db");

exports.getAllProdutos = (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.addProduto = (req, res) => {
  const { codigo, nome, imagemUrl } = req.body;
  db.run(
    `INSERT INTO produtos (codigo, nome, imagemUrl) VALUES (?, ?, ?)`,
    [codigo, nome, imagemUrl],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
};

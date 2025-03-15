const db = require("../config/db");

exports.getAllTransferencias = (req, res) => {
  db.all("SELECT * FROM transferencias", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.addTransferencia = (req, res) => {
  const { codigo, nome } = req.body;
  db.run(
    `INSERT INTO transferencias (codigo, nome) VALUES (?, ?)`,
    [codigo, nome],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
};
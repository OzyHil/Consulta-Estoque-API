const db = require("../config/db");

exports.getAllEmpresas = (req, res) => {
  db.all("SELECT * FROM empresas", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.addEmpresa = (req, res) => {
  const { codigo, nome } = req.body;
  db.run(
    `INSERT INTO empresas (codigo, nome) VALUES (?, ?)`,
    [codigo, nome],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
};

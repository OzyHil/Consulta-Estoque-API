const db = require("../config/db");

exports.getAllCentroDeCustos = (req, res) => {
  db.all("SELECT * FROM centro_de_custos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.addCentroDeCusto = (req, res) => {
  const { codigo, nome } = req.body;
  db.run(
    `INSERT INTO centro_de_custos (codigo, nome) VALUES (?, ?)`,
    [codigo, nome],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
};

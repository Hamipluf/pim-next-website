import { query } from "../../postgresql.config";

async function updateItem(req, res) {
  const { id } = req.params;
  const { matricula, email, telefono } = req.body;
  try {
    const result = await query(
      "UPDATE medicos SET matricula = $1, email = $2 WHERE telefono = $3 RETURNING id = $4 RETURNING *",
      [matricula, email, telefono, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Registro no encontrado" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el registro" });
  }
}

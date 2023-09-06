import { query } from "../../postgresql.config";
async function createItem(req, res) {
  const { matricula, email, telefono } = req.body;
  try {
    const result = await query(
      "INSERT INTO medicos (matricula, email, telefono) VALUES ($1, $2, $3) RETURNING *",
      [matricula, email, telefono]
    );
    res.status(201).json(result.rows[0]); // Devuelve el registro creado
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el registro" });
  }
}

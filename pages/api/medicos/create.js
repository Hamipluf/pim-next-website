import { query } from "../../../postgresql.config";
export default async function handler(req, res) {
  const { matricula, email, telefono } = req.body;
  if (req.method === "POST") {
    if (!matricula || !email || !telefono) {
      res.status(400).json({ error: "Faltan campos a rellenar" });
    }
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
}

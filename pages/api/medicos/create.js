import { query } from "../../../postgresql.config";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { matricula, email, telefono } = req.body;
    if (!matricula || !email || !telefono) {
      res.status(400).json({ error: "Faltan campos a rellenar" });
    }
    try {
      // Verifica si ya existe un registro con la misma matrícula
      const medic = await db.oneOrNone(
        "SELECT * FROM medicos WHERE matricula = $1",
        [matricula]
      );
      if (medic) {
        // Si existe, devuelve el registro existente
        res.status(200).json({status: true, medic});
      }
       // Si no existe, crea un nuevo registro en la base de datos
      const newMedic = await query(
        "INSERT INTO medicos (matricula, email, telefono) VALUES ($1, $2, $3) RETURNING *",
        [matricula, email, telefono]
      );
      res.status(200).json(result.rows[0]); // Devuelve el registro creado
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "No se pudo crear el registro" });
    }
  }
}

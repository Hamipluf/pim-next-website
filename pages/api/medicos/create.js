import { query } from "../../../postgresql.config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { matricula, email, telefono } = req.body;
    console.log(matricula);

    try {
      // Verifica si ya existe un registro con la misma matrícula
      const medic = await query("SELECT * FROM medicos WHERE matricula = $1", [
        matricula,
      ]);
      console.log(medic)
      if (medic.rows !== 0) {
        // Si existe, devuelve el registro existente
        res.status(200).json({ status: true, medic: medic.rows[0] });
      } else {
        // Si no existe, verifica que manden datos y crea un nuevo registro en la base de datos
        if (!matricula || !email || !telefono) {
          res.status(400).json({ error: "Faltan campos a rellenar" });
        } else {
          const newMedic = await query(
            "INSERT INTO medicos (matricula, email, telefono) VALUES ($1, $2, $3) RETURNING *",
            [matricula, email, telefono]
          );
          res.status(201).json({ status: true, medic: newMedic.rows[0] }); // Devuelve el registro creado
        }
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || "No se pudo crear el registro",
      });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}

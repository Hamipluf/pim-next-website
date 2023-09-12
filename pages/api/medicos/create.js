import { query } from "../../../postgresql.config";
import { setCookie } from "cookies-next";

// Función para validar un correo electrónico
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

// Función para verificar si un valor es un número o se puede convertir
const esNumero = (valor) => !isNaN(parseFloat(valor)) && isFinite(valor);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { matricula, email, telefono } = req.body;

    try {
      // Verifica si ya existe un registro con la misma matrícula
      const medic = await query("SELECT * FROM medicos WHERE matricula = $1", [
        matricula,
      ]);

      if (medic.rows.length !== 0) {
        // Si existe, guarda en una cookie y devuelve el registro existente
        const medicData = medic.rows[0];
        setCookie("medicData", JSON.stringify(medicData), {
          req,
          res,
          maxAge: 3600, // Duración de la cookie (1 hora).
          path: "/", // Ruta donde estará disponible la cookie.
        });
        res.status(200).json({ status: true, medico: medicData });
      } else {
        // Si no existe, verifica que se envíen datos y crea un nuevo registro en la base de datos
        if (!matricula || !email || !telefono) {
          res.status(400).json({ status: false, error: "Rellene los campos" });
        } else {
          if (!isValidEmail(email) || !esNumero(matricula)) {
            res.status(400).json({
              status: false,
              error: "Matricula o Correo electrónico inválido",
            });
          } else {
            const newMedic = await query(
              "INSERT INTO medicos (matricula, email, telefono) VALUES ($1, $2, $3) RETURNING *",
              [matricula, email, telefono]
            );

            res.status(200).json({ status: true, medic: newMedic.rows[0] }); // Devuelve el registro creado
          }
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

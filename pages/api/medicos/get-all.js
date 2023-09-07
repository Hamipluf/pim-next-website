import { query } from "../../../postgresql.config";
export default async function handler(req, res) {
  try {
    const result = await query("SELECT * FROM medicos");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res
      .status(500)
      .json({ error: "No se pudo realizar la consulta a la base de datos" });
  }
}

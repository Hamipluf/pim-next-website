import { query } from "../../postgresql.config";
async function getAllItems(req, res) {
  try {
    const result = await query("SELECT * FROM medicos");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los registros" });
  }
}


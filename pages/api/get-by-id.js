import { query } from "../../postgresql.config";

  async function getItemById(req, res) {
    const { id } = req.params;
    try {
      const result = await query('SELECT * FROM medicos WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener el registro' });
    }
  }
  
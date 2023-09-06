import { query } from "../../postgresql.config";

async function deleteItem(req, res) {
    const { id } = req.params;
    try {
      const result = await query('DELETE FROM medicos WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
      } else {
        res.status(200).json({ message: 'Registro eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el registro' });
    }
  }
  
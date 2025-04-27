import {Request, Response, text } from 'express';
import pool from '../database';

class ActividadesController{
  public async list(req: Request, res: Response) {
    try {
      const [actividades] = await pool.query('SELECT * FROM Actividad');
      res.json(actividades); 
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener actividades' });
    }
  }

  public async create (req:Request , resp:Response):Promise<void>{
    await pool.query('INSERT INTO Actividad set ?', [req.body]);
    resp.json({message:'Actividad  guardada'});
  }

  public async delete (req:Request , resp:Response){
    const { id } = req.params;
    await pool.query('DELETE FROM Actividad WHERE id = ?',[id]);
    resp.json({text:'The activiti was deleted'})
  }

  public async update (req:Request, res: Response): Promise<void>{
    const { id } = req.params;
    await pool.query('UPDATE Actividad SET ? WHERE id = ?', [req.body, id]);
    res.json({text:'The activity was updated'});
}

public async getOne(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const [actividades]: any = await pool.query('SELECT * FROM Actividad WHERE id = ?', [id]);

    if (actividades.length > 0) {
      return res.json(actividades[0]); 
    }
    res.status(404).json({ text: 'The activity does not exist' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actividad' });
  }
}
}

export const actividadesController = new ActividadesController();
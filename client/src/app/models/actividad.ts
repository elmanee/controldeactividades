export interface Actividad {
  id?: string | number;
  nomActi?: string;
  descActi?: string;
  fechaIni?: Date;
  fechaFin?: Date;
  prioridadActi?: string;
  usuario_id?: number;
  created_at?: Date;
  estado?: 'pendiente' | 'no-realizada' | 'terminada';
}

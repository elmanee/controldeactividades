export interface Actividad{
  id?:number | string;
  nomActi?: string;
  descActi?: string;
  fechaIni?: Date | string;
  fechaFin?: Date | string;
  prioridadActi?: string;
  created_at?: Date;
  usuario_id?:number | undefined;
}

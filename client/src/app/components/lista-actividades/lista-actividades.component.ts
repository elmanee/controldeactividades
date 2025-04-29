import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-actividades',
  templateUrl: './lista-actividades.component.html',
  styleUrl: './lista-actividades.component.css'
})
export class ListaActividadesComponent implements OnInit {
  // Arrays para almacenar actividades
  actividades: any[] = [];
  actividadesFiltradas: any[] = [];

  // Estado del filtro y búsqueda
  filtroActual: string = 'todas';
  terminoBusqueda: string = '';
  mensajeEstadoVacio: string = 'Prueba a crear una nueva actividad o cambia los filtros';

  constructor(
      private actividadesService: ActividadesService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

    ngOnInit() {
      // Verificar si hay parámetros de consulta para filtrar
      this.route.queryParams.subscribe(params => {
        if (params['filtro']) {
          this.filtroActual = params['filtro'];
        }
        this.getActividades();
      });
    }

    getActividades() {
      this.actividadesService.getActividades().subscribe(
        (res: any[]) => {
          // Asignamos estado a las actividades si no lo tienen
          this.actividades = res.map(actividad => {
            if (!actividad.estado) {
              // Por defecto las actividades son pendientes
              return { ...actividad, estado: 'pendiente' };
            }
            return actividad;
          });

          // Aplicar filtros actuales
          this.filtrarActividades(this.filtroActual);
        },
        err => console.log(err)
      );
    }

    filtrarActividades(filtro: string) {
      this.filtroActual = filtro;

      if (filtro === 'todas') {
        this.actividadesFiltradas = [...this.actividades];
        this.mensajeEstadoVacio = 'No hay actividades registradas';
      } else {
        this.actividadesFiltradas = this.actividades.filter(act => act.estado === filtro);

        // Establecer mensaje personalizado según el filtro
        switch (filtro) {
          case 'pendiente':
            this.mensajeEstadoVacio = 'No hay actividades pendientes';
            break;
          case 'no-realizada':
            this.mensajeEstadoVacio = 'No hay actividades no realizadas';
            break;
          case 'terminada':
            this.mensajeEstadoVacio = 'No hay actividades terminadas';
            break;
        }
      }

      // Aplicar búsqueda si hay término
      if (this.terminoBusqueda) {
        this.buscarActividades();
      }
    }
    
    buscarActividades() {
      // Primero filtramos por estado
      let baseActividades = [];
      if (this.filtroActual === 'todas') {
        baseActividades = [...this.actividades];
      } else {
        baseActividades = this.actividades.filter(act => act.estado === this.filtroActual);
      }

      // Luego filtramos por término de búsqueda
      if (this.terminoBusqueda.trim() === '') {
        this.actividadesFiltradas = baseActividades;
      } else {
        const termino = this.terminoBusqueda.toLowerCase();
        this.actividadesFiltradas = baseActividades.filter(act =>
          act.nomActi.toLowerCase().includes(termino) ||
          act.descActi.toLowerCase().includes(termino)
        );
      }
    }

    cambiarEstado(actividad: any) {
      // Lógica para cambiar estado
      if (actividad.estado === 'terminada') {
        actividad.estado = 'pendiente'; // Reabrir actividad
      } else {
        actividad.estado = 'terminada'; // Completar actividad
      }

      // Actualizar en el backend
      this.actividadesService.updateActividad(actividad.id, actividad).subscribe(
        res => {
          console.log('Estado actualizado:', res);
          // Recargar la lista con el filtro actual
          this.getActividades();
        },
        err => console.log('Error al actualizar estado:', err)
      );
    }

    deleteActiviti(id: string) {
      if (confirm('¿Estás seguro de eliminar esta actividad?')) {
        this.actividadesService.deleteActividad(id).subscribe(
          res => {
            console.log('Actividad Eliminada', res);
            this.getActividades();
          },
          err => console.log(err)
        );
      }
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

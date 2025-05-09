import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad';
import { ActividadesService } from '../../services/actividades.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrl: './actividades-form.component.css'
})
export class ActividadesFormComponent implements OnInit {

  actividad: Actividad = {
    id: '',
    nomActi: '',
    descActi: '',
    fechaIni: new Date(),
    fechaFin: new Date(),
    prioridadActi: '',
    usuario_id: 0,
    created_at: new Date(),
    estado: 'pendiente' // Añadimos el estado por defecto
  };

  edit: boolean = false;

  constructor(
    private actividadesService: ActividadesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.edit = true;
        this.actividadesService.getActividad(id).subscribe(
          res => {
            this.actividad = res;
            // Asegurarnos de que el objeto tiene todas las propiedades necesarias
            this.actividad.fechaIni = this.actividad.fechaIni ? new Date(this.actividad.fechaIni) : new Date();
            this.actividad.fechaFin = this.actividad.fechaFin ? new Date(this.actividad.fechaFin) : new Date();

            // Asegurarnos de que tiene un estado
            if (!this.actividad.estado) {
              this.actividad.estado = 'pendiente';
            }
          },
          err => console.error(err)
        );
      }
    });
  }

  saveNewActivitie(): void {
    if (!this.actividad.nomActi || !this.actividad.descActi || !this.actividad.fechaIni || !this.actividad.fechaFin) {
      console.error("Por favor, complete todos los campos.");
      return;
    }

    delete this.actividad.created_at;

    // Asegurarnos de que tiene un estado
    if (!this.actividad.estado) {
      this.actividad.estado = 'pendiente';
    }

    this.actividadesService.saveActividad(this.actividad).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/actividades']);
      },
      err => {
        console.error(err);
        console.error('Hubo un error al agregar la actividad. Inténtalo de nuevo.');
      }
    );
  }

  updateAvtivite() {
    if (!this.actividad.id) {
      console.error("Error: La actividad no tiene un ID válido.");
      return;
    }

    delete this.actividad.created_at;

    // Asegurarnos de que el ID es una cadena de texto
    const id = String(this.actividad.id); // Convertimos a string de forma segura

    this.actividadesService.updateActividad(id, this.actividad).subscribe(
      res => {
        console.log("Actividad actualizada con éxito", res);
        this.router.navigate(['/actividades']);
      },
      err => {
        console.error("Error al actualizar la actividad", err);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

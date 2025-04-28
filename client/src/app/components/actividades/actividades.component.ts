import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  // Contadores para el dashboard
  contadorPendientes: number = 0;
  contadorNoRealizadas: number = 0;
  contadorTerminadas: number = 0;

  constructor(
    private actividadesService: ActividadesService,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.actualizarContadores();
  }

  actualizarContadores() {
    this.actividadesService.getActividades().subscribe(
      (actividades: any[]) => {
        this.contadorPendientes = actividades.filter(act => act.estado === 'pendiente').length;
        this.contadorNoRealizadas = actividades.filter(act => act.estado === 'no-realizada').length;
        this.contadorTerminadas = actividades.filter(act => act.estado === 'terminada').length;
      },
      err => console.log(err)
    );
  }

  filtrarActividades(estado: string) {
    // Navegar al componente de lista con el filtro aplicado
    this.router.navigate(['/lista-actividades'], {
      queryParams: { filtro: estado }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

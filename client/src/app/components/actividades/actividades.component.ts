import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service'
import { Router } from '@angular/router';
import { AuthService  } from '../../services/auth.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit {

  actividades : any = []

  constructor(
    private actividadesSerive: ActividadesService,
    private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.getActividades();
  }

  getActividades(){
    this.actividadesSerive.getActividades().subscribe(
      res => {
        this.actividades = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  deleteActiviti(id:string){
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.actividadesSerive.deleteActividad(id).subscribe(
        res => {
          console.log('Actividad Eliminada',res)
          this.getActividades();
        },
        err => console.log(err)
      )
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}

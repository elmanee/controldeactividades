import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;
  rememberMe: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  // Getter para facilitar acceso a los controles del formulario
  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      // Mostrar mensaje de error con sweetAlert para campos inválidos
      let errorMsg = '';
      if (this.f['email'].errors) {
        if (this.f['email'].errors['required']) errorMsg = 'El correo electrónico es obligatorio.';
        else if (this.f['email'].errors['email']) errorMsg = 'Introduce un correo electrónico válido.';
      } else if (this.f['password'].errors) {
        if (this.f['password'].errors['required']) errorMsg = 'La contraseña es obligatoria.';
        else if (this.f['password'].errors['minlength']) errorMsg = 'La contraseña debe tener al menos 4 caracteres.';
      }

      Swal.fire({
        title: '¡Campos incompletos!',
        text: errorMsg || 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.loading = true;
    this.login();
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);
        this.loading = false;

        // Mensaje de éxito con sweetAlert
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/actividades']);
        });
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
        this.loading = false;

        // Mensaje de error con sweetAlert
        Swal.fire({
          title: '¡Error!',
          text: 'Credenciales incorrectas. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      },
    });
  }
}

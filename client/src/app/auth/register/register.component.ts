import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordsNotMatch = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Verificar si las contraseñas coinciden
    if (this.f['password'].value !== this.f['confirmPassword'].value) {
      this.passwordsNotMatch = true;

      // Alerta para contraseñas que no coinciden
      Swal.fire({
        title: '¡Las contraseñas no coinciden!',
        text: 'Por favor, verifica que ambas contraseñas sean iguales.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    } else {
      this.passwordsNotMatch = false;
    }

    // Detener si el formulario es inválido
    if (this.registerForm.invalid) {
      // Mostrar mensaje de error con sweetAlert para campos inválidos
      let errorMsg = '';
      if (this.f['name'].errors) {
        errorMsg = 'El nombre es obligatorio.';
      } else if (this.f['email'].errors) {
        if (this.f['email'].errors['required']) errorMsg = 'El correo electrónico es obligatorio.';
        else if (this.f['email'].errors['email']) errorMsg = 'Introduce un correo electrónico válido.';
      } else if (this.f['password'].errors) {
        if (this.f['password'].errors['required']) errorMsg = 'La contraseña es obligatoria.';
        else if (this.f['password'].errors['minlength']) errorMsg = 'La contraseña debe tener al menos 4 caracteres.';
      } else if (this.f['confirmPassword'].errors) {
        errorMsg = 'La confirmación de contraseña es obligatoria.';
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
    this.authService.register(
      this.f['name'].value,
      this.f['email'].value,
      this.f['password'].value
    ).subscribe({
      next: () => {
        this.loading = false;

        // Mensaje de éxito con sweetAlert
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.loading = false;

        // Mensaje de error con detalles específicos si están disponibles
        let errorMessage = 'No se pudo completar el registro. Por favor, intenta nuevamente.';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 409) {
          errorMessage = 'El correo electrónico ya está registrado.';
        }

        // Mensaje de error con sweetAlert
        Swal.fire({
          title: '¡Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      }
    });
  }
}

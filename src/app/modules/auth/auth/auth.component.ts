import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { UsersService } from '@users/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  registered = false;

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    ]),
  });

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.registered = await this.usersService.registered();
  }

  async logIn(): Promise<void> {
    if (this.logInForm.valid) {
      const values = this.logInForm.value;
      try {
        const response = await this.authService.logIn({
          email: values.email!,
          password: values.password!,
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
      } catch (ex: any) {
        if (ex.status && ex.status == 401) {
          this.snackbar.open('Usuario o Contraseña incorrecto.', undefined, {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 2000,
          });
        } else {
          this.snackbar.open('Servidor no encontrado', undefined, {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        }
      }
    }
  }

  async register(): Promise<void> {
    if (this.registerForm.valid) {
      const values = this.registerForm.value;
      await this.usersService.create({
        name: values.name!,
        email: values.email!,
        password: values.password!,
      });
      window.location.reload();
    }
  }
}

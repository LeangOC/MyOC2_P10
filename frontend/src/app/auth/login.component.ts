import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService
} from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';

  password = '';

  errorMessage = '';

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  login(): void {

    this.errorMessage = '';

    this.loading = true;

    this.authService
      .login({
        email: this.email,
        password: this.password
      })
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate(['/home']);
        },

        error: error => {

          this.loading = false;

          console.error(
            'Erreur de connexion',
            error
          );

          this.errorMessage =
            'Email ou mot de passe incorrect.';
        }
      });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  contactSupport(): void {
    this.router.navigate(['/chat']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

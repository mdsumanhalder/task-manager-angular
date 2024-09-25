import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole();
    if (role) {
      // Add role-specific checks here if necessary
      return true; // Allow access
    }
    this.router.navigate(['/login']); // Redirect if unauthorized
    return false;
  }
}

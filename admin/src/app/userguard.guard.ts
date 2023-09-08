// userguard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserguardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated (e.g., check for a token)
    const isAuthenticated = true; // Replace with your authentication logic

    if (isAuthenticated) {
      return true;
    } else {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

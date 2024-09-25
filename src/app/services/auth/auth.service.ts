import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auths'; // Adjust API URL

  private token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserRole(): string | null {
    if (this.token) {
      const payload = this.token.split('.')[1]; // Get the payload part of the token
      const decoded = JSON.parse(atob(payload)); // Decode and parse it
      return decoded.role; // Return the user's role
    }
    return null;
  }
}

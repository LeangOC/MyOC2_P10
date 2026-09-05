import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:8080/api/auth';

  private readonly storageKey =
    'ycyw_user';

  constructor(
    private http: HttpClient
  ) {
  }

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap(response => {

          localStorage.setItem(
            this.storageKey,
            JSON.stringify(response)
          );

        })
      );
  }

  getCurrentUser(): LoginResponse | null {

    const user =
      localStorage.getItem(this.storageKey);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  logout(): void {

    localStorage.removeItem(
      this.storageKey
    );
  }

  isLoggedIn(): boolean {

    return this.getCurrentUser() !== null;
  }
}

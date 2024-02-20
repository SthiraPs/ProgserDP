import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseModel } from 'app/modules/other/model/response.model';
import { NotificationService } from 'app/modules/other/services/notification.service';
import { catchError, throwError, Observable, of, switchMap } from 'rxjs';
import { UserModel } from '../../register/model/user.model';
import { SigninModel } from '../model/signin.model';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root',
})
export class SignInService {
    private apiUrl = 'http://localhost:3400/api/sign-in/'; // Example if your Node.js app is on port 3000

    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // Assuming UserModel has correct properties
    set userDetails(user: UserModel) {
        localStorage.setItem('email', user.email);
        localStorage.setItem('avatar', user.avatar);
        localStorage.setItem('fullName', user.fullName);
        localStorage.setItem('fullName', user.role);
    }

  
get userDetails(): UserModel {
    const userId = parseInt(localStorage.getItem('userId') || '0'); // Default to 0 for ID
    const email = localStorage.getItem('email') || '';
    const avatar = localStorage.getItem('avatar') || ''; 
    const fullName = localStorage.getItem('fullName') || '';
    const status = localStorage.getItem('status') || 'active'; // Default to 'active'
    const lastSeen = localStorage.getItem('lastSeen') || ''; // Up to you if you need a default 
    const department = localStorage.getItem('department') || ''; 
    const role = localStorage.getItem('role') || '';
  
    return new UserModel(
      userId,
      fullName,
      '', // We'll address password omission below
      email,
      status,
      lastSeen,
      avatar,
      department,
      role
    );
  }

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService
    ) {}

    signIn(credentials: { email: string; password: string }): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post('http://localhost:3400/auth/sign-in', credentials)
            .pipe(
                switchMap((response: any) => {
                    this.accessToken = response.accessToken;
                    this._authenticated = true;
                    this._userService.user = response.user;
                    return of(response);
                })
            );
    }

    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }
}

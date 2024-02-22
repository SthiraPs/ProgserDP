import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseModel } from 'app/modules/other/model/response.model';
import { NotificationService } from 'app/modules/other/services/notification.service';
import { catchError, throwError, Observable, of, switchMap } from 'rxjs';
import { UserModel } from '../../register/model/user.model';
import { SigninModel } from '../model/signin.model';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environemnts/environment';

@Injectable({
    providedIn: 'root',
})
export class SignInService {
    private baseUrl = `${environment.apiUrl}/auth`;

    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    set userEmail(email: string) {
        localStorage.setItem('email', email);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    get userEmail(): string {
        return localStorage.getItem('email') ?? '';
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
            .post(`${this.baseUrl}/sign-in`, credentials)
            .pipe(
                switchMap((response: any) => {
                    this.accessToken = response.accessToken;
                    this.userEmail = response.user.email;
                    this._authenticated = true;
                    this._userService.user = response.user;
                    return of(response);
                })
            );
    }

    signInUsingToken(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        const payload = {
            accessToken: this.accessToken,
            email: this.userEmail,
        };

        return this._httpClient
            .post(`${this.baseUrl}/sign-in-with-token`, payload )
            .pipe(
                catchError(() => of(false)),
                switchMap((response: any) => {
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }
                    this._authenticated = true;
                    this._userService.user = response.user;
                    return of(true);
                })
            );
    }

    signOut(): Observable<any> {
        console.log('out');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}/forgot-password`, email);
    }

    resetPassword(password: string): Observable<any> {
        return this._httpClient.post(
            `${this.baseUrl}/reset-password`,
            password
        );
    }

    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(
            `${this.baseUrl}/unlock-session`,
            credentials
        );
    }

    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        //if (AuthUtils.isTokenExpired(this.accessToken)) {
        if (false) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}

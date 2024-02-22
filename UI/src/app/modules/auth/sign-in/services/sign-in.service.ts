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

    get userEmail(): string {
        return localStorage.getItem('email') ?? '';
    }

    set userEmail(email: string) {
        console.log(email);
        localStorage.setItem('email', email);
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
                    this.userEmail = response.user.email;
                    this._authenticated = true;
                    this._userService.user = response.user;
                    return of(response);
                })
            );
    }

    signInUsingToken(): Observable<any> {
        //Sign in using the token
        return this._httpClient
            .post('http://localhost:3400/auth/sign-in-with-token', {
                accessToken: this.accessToken,
                email: this.userEmail,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );

        return of(true);
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
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
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

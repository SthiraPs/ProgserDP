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

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService
    ) {}

    signIn(user: UserModel): Observable<SigninModel> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', user).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );

        return this.http.post<SigninModel>(this.apiUrl, user).pipe(
            catchError((error) => {
                console.log(error);
                this._notificationService.showErrorMessage(error.message);
                return throwError(() => error);
            })
        );
    }
}

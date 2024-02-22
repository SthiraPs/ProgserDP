import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { ResponseModel } from 'app/modules/other/model/response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from 'app/modules/other/services/notification.service';
import { environment } from 'environemnts/environment';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private baseUrl = `${environment.apiUrl}/api/users`;

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set userEmail(email: string) {
        localStorage.setItem('email', email);
    }

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService
    ) {}

    getUsers() {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this.http.get<UserModel[]>(this.baseUrl, { headers }).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);
                return throwError(() => error); // Or a more informative error type
            })
        );
    }

    createUser(user: UserModel): Observable<ResponseModel> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this.http
            .post<ResponseModel>(this.baseUrl, user, { headers })
            .pipe(
                catchError((error) => {
                    this._notificationService.showErrorMessage(error.message);
                    return throwError(() => error);
                })
            );
    }
}

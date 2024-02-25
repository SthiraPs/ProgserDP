import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentModel } from '../model/department.model';
import { NotificationService } from './notification.service';
import { RoleModel } from '../model/role.model';
import { catchError, throwError } from 'rxjs';
import { environment } from 'environemnts/environment';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private baseUrl = `${environment.apiUrl}/api/roles`;

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

    getRoles() {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this.http.get<RoleModel[]>(this.baseUrl, { headers }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }
}

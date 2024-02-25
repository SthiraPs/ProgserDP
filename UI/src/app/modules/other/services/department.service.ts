import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/modules/auth/register/model/user.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { NotificationService } from './notification.service';
import { DepartmentModel } from '../model/department.model';
import { environment } from 'environments/environment';
import { SignInPopupComponent } from 'app/modules/auth/sign-in/components/sign-in-popup/sign-in-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    private baseUrl = `${environment.apiUrl}/api/departments`;

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set userEmail(email: string) {
        localStorage.setItem('email', email);
    }

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService,
        private _matDialog: MatDialog,
    ) {}

    getDepartments() {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this.http.get<DepartmentModel[]>(this.baseUrl).pipe(
            catchError((error) => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('email');
                const dialogRef = this._matDialog.open(SignInPopupComponent);

                return throwError(() => error);
            })
        );
    }
}

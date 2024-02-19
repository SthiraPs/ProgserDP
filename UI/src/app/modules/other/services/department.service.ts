import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/modules/auth/register/model/user.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { NotificationService } from './notification.service';
import { DepartmentModel } from '../model/department.model';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    private apiUrl = 'http://localhost:3400/api/departments/'; // Example if your Node.js app is on port 3000

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService
    ) {}

    getDepartments() {
        return this.http.get<DepartmentModel[]>(this.apiUrl).pipe(
            catchError((error) => {
                // Error handling logic here
                console.error('Error fetching users:', error);
                return throwError(() => error); // Or a more informative error type
            })
        );
    }
}

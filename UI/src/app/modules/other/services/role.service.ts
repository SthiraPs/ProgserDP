import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentModel } from '../model/department.model';
import { NotificationService } from './notification.service';
import { RoleModel } from '../model/role.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private apiUrl = 'http://localhost:3400/api/roles/'; // Example if your Node.js app is on port 3000

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService
    ) {}

    getRoles() {
        return this.http.get<RoleModel[]>(this.apiUrl).pipe(
            catchError((error) => {
                // Error handling logic here
                console.error('Error fetching users:', error);
                return throwError(() => error); // Or a more informative error type
            })
        );
    }
}

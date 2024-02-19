import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { ResponseModel } from 'app/modules/other/model/response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from 'app/modules/other/services/notification.service';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private apiUrl = 'http://localhost:3400/api/users/'; // Example if your Node.js app is on port 3000

    constructor(
        private http: HttpClient,
        private _notificationService: NotificationService,
        
    ) {}

    getUsers() {
      return this.http.get<UserModel[]>(this.apiUrl).pipe(
        catchError(error => {
          // Error handling logic here
          console.error("Error fetching users:", error); 
          return throwError(() => error); // Or a more informative error type
        })
      );
    }

    createUser(user: UserModel): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(this.apiUrl, user).pipe(
            catchError((error) => {
              console.log(error)
                this._notificationService.showErrorMessage(error.message);
                return throwError(() => error);
            })
        );
    }
}

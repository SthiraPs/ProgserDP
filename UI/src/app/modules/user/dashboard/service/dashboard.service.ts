import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3400/api/users/'; // Example if your Node.js app is on port 3000 

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        // Error handling logic here
        console.error("Error fetching users:", error); 
        return throwError(() => error); // Or a more informative error type
      })
    );
  }
  
  
  getUserById(id: string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  
  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }
  
  updateUser(id: string, updatedUser: User) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, updatedUser);
  }
  
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}

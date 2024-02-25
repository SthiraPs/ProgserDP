import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    private apiUrl = 'http://localhost:3400/api/users/'; // Example if your Node.js app is on port 3000

    constructor(private http: HttpClient) {}

}

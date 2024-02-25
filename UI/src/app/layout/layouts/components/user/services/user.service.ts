import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/layout/layouts/components/user/services/user.types';
import { environment } from 'environemnts/environment';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private baseUrl = `${environment.apiUrl}/api/users`;

    set user(value: User) {
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    update(user: User): Observable<any> {
        console.log(user);
        return this._httpClient.patch<User>(`${this.baseUrl}/${user._id}`, user).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}

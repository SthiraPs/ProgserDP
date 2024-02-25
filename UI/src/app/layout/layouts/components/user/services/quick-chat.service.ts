import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/modules/auth/register/model/user.model';
import { environment } from 'environments/environment';
import { io, Socket } from 'socket.io-client';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    of,
    switchMap,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuickChatService {
    private _user: BehaviorSubject<UserModel> = new BehaviorSubject(null);
    private _users: BehaviorSubject<UserModel[]> = new BehaviorSubject<
        UserModel[]
    >(null);
    private baseUrl = `${environment.apiUrl}/api/users`;
    private socket: Socket;

    constructor(private _httpClient: HttpClient) {
        this.socket = io(environment.apiUrl);
        this.listenForOnlineUsers();
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    get chat$(): Observable<UserModel> {
        return this._user.asObservable();
    }

    get chats$(): Observable<UserModel[]> {
        if (!this._users.getValue()) {
            this.getUsers().subscribe();
        }
        console.log(this._users)
        return this._users.asObservable();
    }

    getUsers(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this._httpClient
            .get<UserModel[]>(this.baseUrl, { headers })
            .pipe(
                tap((response: UserModel[]) => {
                    this._users.next(response);
                }),
                catchError((error) => {
                    console.error('Error fetching users:', error);
                    return throwError(() => error); // Or a more informative error type
                })
            );
    }

    getChatById(id: string): Observable<any> {
        return this._httpClient
            .get<UserModel>('api/apps/chat/chat', { params: { id } })
            .pipe(
                map((chat) => {
                    // Update the chat
                    this._user.next(chat);

                    // Return the chat
                    return chat;
                }),
                switchMap((chat) => {
                    if (!chat) {
                        return throwError(
                            'Could not found chat with id of ' + id + '!'
                        );
                    }

                    return of(chat);
                })
            );
    }

    // Method to emit events
    listenForOnlineUsers(): void {
        this.socket.on('online-users', (users: UserModel[]) => {
            console.log('Online users updated:', users);
            this._users.next(users); // Update the list of users
        });
    }
}

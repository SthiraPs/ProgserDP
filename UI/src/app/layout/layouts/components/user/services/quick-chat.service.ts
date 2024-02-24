import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/modules/auth/register/model/user.model';
import { environment } from 'environemnts/environment';
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
    private _chat: BehaviorSubject<UserModel> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(
        null
    );
    private baseUrl = `${environment.apiUrl}/api/users`;

    constructor(private _httpClient: HttpClient) {}
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    get chat$(): Observable<UserModel> {
        return this._chat.asObservable();
    }

    get chats$(): Observable<UserModel[]> {
        return this._chats.asObservable();
    }

    getChats(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`,
        });

        return this._httpClient
            .get<UserModel[]>(this.baseUrl, { headers })
            .pipe(
                tap((response: UserModel[]) => {
                    this._chats.next(response);
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
                    this._chat.next(chat);

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
}

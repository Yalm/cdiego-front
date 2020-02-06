import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    index(): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    show(id: number): Observable<User> {
        return this.http.get<User>(`users/${id}`);
    }

    store(data: User): Observable<User> {
        return this.http.post<User>('users', data).pipe(
            switchMap(response => data.avatar ? this.upload(data.avatar, response.id) : of(null))
        );
    }

    update(data: User): Observable<User> {
        return this.http.put<User>(`users/${data.id}`, data).pipe(
            switchMap(() => data.avatar ? this.upload(data.avatar, data.id) : of(null))
        );
    }

    password(data: { current_password: string, password: string, password_confirmation: string }): Observable<void> {
        return this.http.patch<void>('users/password', data);
    }

    private upload(data: string | File, id: number): Observable<User> {
        if (data instanceof File) {
            const FORM_DATA = new FormData();
            FORM_DATA.append('avatar', data);
            return this.http.post<User>(`users/upload/${id}`, FORM_DATA).pipe(
                catchError(() => of(null))
            );
        } else {
            return of(null);
        }
    }
}

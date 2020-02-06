import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/views/auth/models/customer';
import { flatten } from 'q-flat';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    show(id: number, query?: any): Observable<Customer> {
        return this.http.get<Customer>(`customers/${id}`, { params: flatten(query) });
    }

    count(): Observable<number> {
        return this.http.get<number>('customers/count');
    }

    update(data: Customer): Observable<Customer> {
        return this.http.put<Customer>(`customers/${data.id}`, data);
    }
}

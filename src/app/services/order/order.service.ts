import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/models/pagination.model';
import { flatten } from 'q-flat';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    index(query?: any): Observable<Order[]> {
        return this.http.get<Pagination<Order>>('orders', { params: flatten(query) })
            .pipe(
                map(response => response.data)
            );
    }

    show(id: string, query?: any): Observable<Order> {
        return this.http.get<any>(`orders/${id}`, { params: flatten(query) })
            .pipe(
                map(item => {
                    item.products = item.products.map(({ product, quantity }) => {
                        return { quantity, ...product };
                    });
                    return item;
                })
            );
    }

    store(data: { culqi_token: string, email: string, items?: any[] }): Observable<Order> {
        data.items = JSON.parse(localStorage.getItem('items'));
        return this.http.post<Order>(`orders`, data);
    }
}

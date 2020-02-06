import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Params } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { map } from "rxjs/operators";
import { Pagination } from 'src/app/models/pagination.model';
import { flatten } from 'q-flat';

@Injectable({
    providedIn: "root"
})
export class ProductService {
    constructor(private http: HttpClient) { }

    index(query?: Params): Observable<Pagination<Product>> {
        return this.http.get<[Product[], number]>("products", { params: query })
            .pipe(
                map(([data, total]) => {
                    return { data, total } as Pagination<Product>;
                })
            );
    }

    show(id: string, query?: any): Observable<Product> {
        return this.http.get<Product>(`products/${id}`, { params: flatten(query) });
    }
}

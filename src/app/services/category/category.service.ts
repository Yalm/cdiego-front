import { Injectable } from "@angular/core";
import { Category } from "src/app/models/category.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { flatten } from 'q-flat';

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    constructor(private http: HttpClient) { }

    count(where: any): Observable<Category[]> {
        return this.http.get<Category[]>("categories/count", { params: where });
    }

    index(query?: any): Observable<Category[]> {
        return this.http.get<Category[]>('categories', { params: flatten(query) });
    }

    show(id: number): Observable<Category> {
        return this.http.get<Category>(`categories/${id}`);
    }

    store(data: { name: string; parent_id?: number }): Observable<Category> {
        return this.http.post<Category>("categories", data);
    }

    update(data: Category): Observable<Category> {
        return this.http.put<Category>(`categories/${data.id}`, data);
    }

    destroy(id: number): Observable<Category> {
        return this.http.delete<Category>(`categories/${id}`);
    }
}

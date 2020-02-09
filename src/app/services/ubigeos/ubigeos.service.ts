import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UbigeosService {

    constructor(private http: HttpClient) { }

    departments(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/departamentos.json');
    }

    department(id: string): Observable<string> {
        return this.http.get<any[]>('assets/json/departamentos.json')
            .pipe(
                map(response => response.find(({ id_ubigeo }) => id_ubigeo === id).nombre_ubigeo)
            );
    }

    provinces(id: string): Observable<any[]> {
        return this.http.get<any[]>('assets/json/provincias.json').pipe(
            map(response => {
                const provinces = Object.keys(response).find(element => element === id);
                return response[provinces];
            })
        );
    }

    province(parent: string, id: string): Observable<string> {
        return this.http.get<any[]>('assets/json/provincias.json').pipe(
            map(response => {
                const provinces = Object.keys(response).find(element => element === parent);
                return response[provinces].find(({ id_ubigeo }) => id_ubigeo === id).nombre_ubigeo;
            })
        );
    }

    getProvinceAndDepartment(data: { departament: string, province: string, shipping: boolean }): Observable<[string, string]> | Observable<[null, null]> {
        if (data.shipping) {
            return forkJoin(
                this.http.get<{ id_ubigeo: string, nombre_ubigeo: string }[]>('assets/json/departamentos.json')
                    .pipe(
                        map(response => response.find(({ id_ubigeo }) => id_ubigeo === data.departament).nombre_ubigeo)
                    ),
                this.http.get<any[]>('assets/json/provincias.json').pipe(
                    map(response => {
                        const provinces = Object.keys(response).find(element => element === data.departament);
                        return response[provinces].find(({ id_ubigeo }) => id_ubigeo === data.province).nombre_ubigeo;
                    })
                )
            );
        }
        return forkJoin([of(null), of(null)]);
    }
}

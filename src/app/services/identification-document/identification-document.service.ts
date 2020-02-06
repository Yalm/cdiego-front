import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IdentificationDocument } from 'src/app/models/identification-document.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private http: HttpClient) { }

    public index(): Observable<IdentificationDocument[]> {
        return this.http.get<IdentificationDocument[]>('documents');
    }
}

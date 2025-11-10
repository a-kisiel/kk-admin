import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection } from '../models/collection.model';

const baseUrl = 'http://localhost:8000/api/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${baseUrl}`);
  }

  get(id: any): Observable<Collection> {
    return this.http.get<Collection>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    const req = this.http.post(`${baseUrl}/`, data);
    return req;
  }

  update(id: any, data: any): Observable<any> {
    const req = this.http.put(`${baseUrl}/${id}/`, data);
    return req;
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/`);
  }
}
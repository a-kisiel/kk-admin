import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medium } from '../models/medium.model';

// const baseUrl = 'http://localhost:8000/api/media';
const baseUrl = 'https://db.katiekisiel.com/api/media';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medium[]> {
    return this.http.get<Medium[]>(`${baseUrl}`);
  }

  get(id: any): Observable<Medium> {
    return this.http.get<Medium>(`${baseUrl}/${id}`);
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
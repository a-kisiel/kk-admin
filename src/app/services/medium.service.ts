import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medium } from '../models/medium.model';
import { Json } from './json';

const baseUrl = 'http://localhost:8000/api/media';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private http: HttpClient) { }

  // jsonService 6t= inject(Json);

  getAll(): Observable<Medium[]> {
    return this.http.get<Medium[]>(`${baseUrl}`);
  }

  get(id: any): Observable<Medium> {
    return this.http.get<Medium>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    const req = this.http.post(`${baseUrl}/`, data);
    // req.subscribe(m => this.jsonService.compile('media', 'add', m));
    return req;
  }

  update(id: any, data: any): Observable<any> {
    const req = this.http.put(`${baseUrl}/${id}/`, data);
    // req.subscribe(m => this.jsonService.compile('media', 'edit', m));
    return req;
  }

  delete(id: any): Observable<any> {
    // this.jsonService.compile('media', 'delete', {id});
    return this.http.delete(`${baseUrl}/${id}/`);
  }
}
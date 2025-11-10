import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Piece } from '../models/piece.model';
import { Json } from './json';

const baseUrl = 'http://localhost:8000/api/pieces';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(private http: HttpClient) { }

  // jsonService = inject(Json);

  async getNewFilename(): Promise<string> {
    const existing = await lastValueFrom(this.http.get(`${baseUrl}/titles`));

    if (!(existing instanceof Array))
      return '';

    // Ensure a new hash
    let hash = null;
    while (!hash || existing.includes(hash)) {
      hash = Math.random().toString(36).substr(2, 12).toLocaleUpperCase();
    };

    return hash ?? '';
  }

  getAll(params = {}): Observable<Piece[]> {
    return this.http.get<Piece[]>(`${baseUrl}`, {
      params
    });
  }

  get(id: any): Observable<Piece> {
    return this.http.get<Piece>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    const req = this.http.post(`${baseUrl}/`, data);
    // req.subscribe(p => this.jsonService.compile('pieces', 'add', p));
    return req;
  }

  update(id: any, data: any): Observable<any> {
    const req = this.http.put(`${baseUrl}/${id}/`, data);
    // req.subscribe(p => this.jsonService.compile('pieces', 'edit', p));
    return req;
  }

  delete(id: any): Observable<any> {
    // this.jsonService.compile('piece', 'delete', {id});
    return this.http.delete(`${baseUrl}/${id}/`);
  }
}
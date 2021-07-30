import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: string | number }> {

  entity: string = '';

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entity}`);
  }

  get(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.config.apiUrl}${this.entity}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.config.apiUrl}${this.entity}/${entity.id}`, entity);
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.config.apiUrl}${this.entity}/${entity.id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { _id: string }> {

  entity: string = '';

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entity}`);
  }

  get(_id: string | number): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${_id}`);
  }

  create(entity: T): Observable<T> {
    const postData = { ...entity, _id: null };
    return this.http.post<T>(`${this.config.apiUrl}${this.entity}`, postData);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.config.apiUrl}${this.entity}/${entity._id}`, entity);
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.config.apiUrl}${this.entity}/${entity._id}`);
  }

}

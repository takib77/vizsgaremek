import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyEvent } from '../model/event';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<MyEvent> {

  constructor(
    public http: HttpClient,
    public config: ConfigService
  ) {
    super(http, config);
    this.entity = 'events'
  }
}

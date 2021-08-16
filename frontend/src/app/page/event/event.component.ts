import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MyEvent } from 'src/app/model/event';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventList$: Observable<MyEvent[]> = this.eventservice.getAll();
  eventTable: IDataDisplayer[] = this.config.eventTable;
  eventTitle: string = 'Események listája';
  pageName: string = 'events';

  filterKey: string = '';
  phrase: string = '';

  columnKey: string = '';
  sortDir: number = -1;

  constructor(
    private eventservice: EventService,
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(myEvent: MyEvent): void {
    this.router.navigate(['/events/edit', myEvent._id])
  }

  onDeleteOne(myEvent: MyEvent): void {
    if (confirm(`Biztos hogy törli az eseményt?`)) {
      this.eventservice.delete(myEvent).subscribe(
        () => this.eventList$ = this.eventservice.getAll());
      this.toastr.warning('Az adat törölve lett!', 'Törölve', { timeOut: 3000 });
    }
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }

  onSearch(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

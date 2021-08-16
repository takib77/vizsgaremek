import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyEvent } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: MyEvent = new MyEvent();
  title: string = '';

  constructor(
    private eventservice: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === '0') {
          this.event = new MyEvent();
          this.title = 'Új esemény felvétele';
        }
        else
          this.eventservice.get(params.id).subscribe(
            item => {
              this.event = item;
              this.title = 'Esemény szerkesztése';
            })
      })
  }

  onSubmit(myEvent: MyEvent): void {
    if (!myEvent._id) {
      this.eventservice.create(myEvent).subscribe(() => {
        this.router.navigate(['/events']);
        this.toastr.info('Az adatok mentése sikerrel zárult!', 'Mentve', { timeOut: 3000 });
      });

    } else {
      this.eventservice.update(myEvent).subscribe(() => {
        this.router.navigate(['/events']);
        this.toastr.info('Az adatok módosítása sikerrel zárult!!', 'Módosítva', { timeOut: 3000 });
      });
    }
  }

}

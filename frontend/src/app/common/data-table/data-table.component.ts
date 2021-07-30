import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataDisplayer, ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends { [propname: string]: any }> implements OnInit {

  @Input() tableColumns: IDataDisplayer[] = [];
  @Input() list$: Observable<T[]> | null = null;
  @Input() tableTitle: string = '';

  constructor(
    private config: ConfigService,
  ) { }


  ngOnInit(): void {
  }

}

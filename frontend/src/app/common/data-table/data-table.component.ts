import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDataDisplayer } from 'src/app/service/config.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends { [propname: string]: any }> implements OnInit {

  @Input() tableColumns: IDataDisplayer[] = [];
  @Input() list$: Observable<T[]> = of([]);
  @Input() tableTitle: string = '';
  @Input() entityName: string = '';

  @Input() filterKey: string = '';
  phrase: string = '';

  @Output() selectEntity: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteEntity: EventEmitter<T> = new EventEmitter<T>();

  columnKey: string = '';
  sortDir: number = -1;

  constructor() { }

  ngOnInit(): void { }

  onSelectEntity(entity: T): void {
    this.deleteEntity.emit(entity);
  }

  onDeleteEntity(entity: T): void {
    this.deleteEntity.emit(entity);
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }

  onSearch(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

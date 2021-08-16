import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from 'src/app/model/address';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList$: Observable<Address[]> = this.userservice.getAll().pipe(
    map(users => users.map(items => items.address)));

  addressTable: IDataDisplayer[] = this.config.addressTable;
  addressTitle: string = 'Címek listája';
  pageName: string = 'address';

  filterKey: string = '';
  phrase: string = '';

  columnKey: string = '';
  sortDir: number = -1;

  constructor(
    private userservice: UserService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void { }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }

  onSearch(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

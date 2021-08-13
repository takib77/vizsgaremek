import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList$: Observable<User[]> = this.userservice.getAll();
  userTable: IDataDisplayer[] = this.config.userTable;
  userTitle: string = 'Felhasználók listája';
  pageName: string = 'users';

  filterKey: string = '';
  phrase: string = '';

  columnKey: string = '';
  sortDir: number = -1;

  constructor(
    private userservice: UserService,
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(user: User): void {
    this.router.navigate(['/users/edit', user._id])
  }

  onDeleteOne(user: User): void {
    if (confirm(`Biztos hogy törli a(z) \"${user.first_name} ${user.last_name}\" nevű felhasználót?`)) {
      this.userservice.delete(user).subscribe(
        () => this.userList$ = this.userservice.getAll());
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList$: Observable<User[]> = this.userservice.getAll();
  usersTable: IDataDisplayer[] = this.config.usersTable;
  usersTitle: string = 'Vásárlók listája';
  pageName: string = 'users';

  constructor(
    private userservice: UserService,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(user: User): void {
    this.router.navigate(['/', 'users', user.id])
  }

  onDeleteOne(user: User): void {
    if (confirm(`Biztos hogy törli?`))
      this.userservice.delete(user).subscribe(
        () => this.usersList$ = this.userservice.getAll()
      )
  }

}

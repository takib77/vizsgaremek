import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  userTitle: string = 'Vásárlók listája';
  pageName: string = 'users';

  constructor(
    private userservice: UserService,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(user: User): void {
    this.router.navigate(['/user', user._id])
  }

  onDeleteOne(user: User): void {
    if (confirm(`Biztos hogy törli a \"${user.first_name} ${user.last_name}\" nevű felhasználót?`))
      this.userservice.delete(user).subscribe(
        () => this.userList$ = this.userservice.getAll()
      )
  }

}

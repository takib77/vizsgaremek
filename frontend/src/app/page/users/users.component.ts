import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList$: Observable<User[]> = this.userservice.getAll();

  constructor(
    private userservice: UserService
  ) { }

  ngOnInit(): void {
  }

  deleteUser(user: User): void {
    if (confirm(`Biztos hogy törli a \"${user.firstName} ${user.lastName}\" nevű vásárlót?`))
      this.userservice.delete(user).subscribe(() => {
        this.userList$ = this.userservice.getAll()
      })

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user: User = new User();
  title: string = '';

  emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverError: string = '';

  usersEmails: Observable<string[]> = this.userservice.getAll()
    .pipe(map(items => items
      .map(users => users.email))
    )

  constructor(
    private userservice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === '0') {
          this.user = new User();
          this.title = 'Új felhasználó felvétele';
        }
        else
          this.userservice.get(params.id).subscribe(
            item => {
              this.user = item;
              this.title = 'Felhasználó szerkesztése';
            })
      })
  }

  onSubmit(user: User): void {
    if (!user._id) {
      this.userservice.create(user).subscribe(() => {
        this.router.navigate(['/users']);
        this.toastr.info('Az adatok mentése sikerrel zárult!', 'Mentve', { timeOut: 3000 });
      });

    } else {
      this.userservice.update(user).subscribe(() => {
        this.router.navigate(['/users']);
        this.toastr.info('Az adatok módosítása sikerrel zárult!!', 'Módosítva', { timeOut: 3000 });
      });
    }
  }

}

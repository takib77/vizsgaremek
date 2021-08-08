import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private userservice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        this.router.navigate(['/users'])
      });

    } else {
      this.userservice.update(user).subscribe(() => {
        this.router.navigate(['/users'])
      });
    }
  }

}

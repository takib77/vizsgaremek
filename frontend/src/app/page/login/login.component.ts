import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  serverError: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(ngForm: NgForm): void {
    this.auth.login(ngForm.value).toPromise().then(
      response => {
        if (this.auth.currentUserSubject$.value) {
          this.router.navigate(['/']);
        }
      },
      err => {
        this.serverError = 'A megadott email cím vagy jelszó hibás!';
        const to = setTimeout(() => {
          clearTimeout(to);
          this.serverError = '';
        }, 3000);
      }
    );
  }

}

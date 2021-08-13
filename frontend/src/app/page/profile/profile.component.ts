import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: User | null = null;

  emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userservice: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.currentUser);
    this.userservice.get(user._id).subscribe(
      item => this.user$ = item
    );
  }

  onSubmit(user: User): void {
    delete user.accessToken;
    this.userservice.update(user).subscribe(() => {
      this.router.navigate(['/']);
      this.toastr.info('Az adatok módosítása sikerrel zárult!!', 'Módosítva', { timeOut: 3000 });
    });
  }

}

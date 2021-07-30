import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './model/user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Kisállat kereskedés';
  user$: BehaviorSubject<User | null> = this.auth.currentUserSubject$;

  constructor(
    private auth: AuthService
  ) { }


}

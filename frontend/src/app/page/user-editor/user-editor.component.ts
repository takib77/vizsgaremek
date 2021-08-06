import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user: User = new User();
  user$: Observable<User> = this.ar.params.pipe(
    switchMap(params => this.userservice.get(params.id)));

  fields: any[] = [];
  showForm: boolean = false;

  constructor(
    private userservice: UserService,
    private router: Router,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user$.subscribe(
      user => {
        this.user = user;
        this.setForm();
        this.showForm = true;
      });
  }

  setForm(): void {
    this.fields = [
      {
        key: '_id',
        label: '',
        type: 'hidden',
        value: this.user._id
      },
      {
        key: 'first_name',
        label: 'VEZETÉKNÉV',
        type: 'text',
        value: this.user.first_name,
        validators: [Validators.required, Validators.minLength(4)],
        errorMessage: 'A név kötelez :)'
      },
      {
        key: 'last_name',
        label: 'KERESZTNÉV',
        type: 'text',
        value: this.user.last_name,
        validators: [Validators.required, Validators.pattern(/[A-Z]/)],
        errorMessage: 'A név kötelez :)'
      },
      {
        key: 'address',
        label: 'CÍM',
        type: 'text',
        value: this.user.address
      },
      {
        key: 'email',
        label: 'EMAIL CÍM',
        type: 'text',
        value: this.user.email,
        validators: [Validators.required],
        errorMessage: 'A név kötelez :)'
      },
      {
        key: 'password',
        label: 'JELSZÓ',
        type: 'password',
        value: this.user.password
      },
      {
        key: 'role',
        label: 'JOGOSULTSÁG',
        type: 'number',
        value: this.user.role
      }
    ];
  }

  onSubmit(user: User): void {
    this.userservice.update(user).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}

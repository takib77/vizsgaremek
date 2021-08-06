import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FieldBase } from 'src/app/areus-form/model/field-base';
import { InputField } from 'src/app/areus-form/model/input-field';
import { SelectField } from 'src/app/areus-form/model/select-field';
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

  fields: FieldBase<any>[] = [];
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
      new InputField({
        key: '_id',
        label: '',
        type: 'hidden',
        value: this.user._id
      }),
      new InputField({
        key: 'first_name',
        label: 'VEZETÉKNÉV',
        type: 'text',
        value: this.user.first_name,
        validators: [Validators.required, Validators.minLength(4)],
        errorMessage: 'A név kötelez :)'
      }),
      new InputField({
        key: 'last_name',
        label: 'KERESZTNÉV',
        type: 'text',
        value: this.user.last_name,
        validators: [Validators.required, Validators.pattern(/[A-Z]/)],
        errorMessage: 'A név kötelez :)'
      }),
      new InputField({
        key: 'address.country',
        label: 'ORSZÁG',
        type: 'text',
        value: this.user.address?.country as string
      }),
      new InputField({
        key: 'address.city',
        label: 'VÁROS',
        type: 'text',
        value: this.user.address?.city as string
      }),
      new InputField({
        key: 'address.street',
        label: 'UTCA ÉS HÁZSZÁM',
        type: 'text',
        value: this.user.address?.street as string
      }),
      new InputField({
        key: 'email',
        label: 'EMAIL CÍM',
        type: 'text',
        value: this.user.email,
        validators: [Validators.required],
        errorMessage: 'A név kötelez :)'
      }),
      new InputField({
        key: 'password',
        label: 'JELSZÓ',
        type: 'password',
        value: this.user.password as string
      }),
      new SelectField({
        key: 'role',
        label: 'JOGOSULTSÁG',
        controlType: 'select',
        options: [
          { value: '1', label: 'Felhasználó' },
          { value: '2', label: 'Szerkesztő' },
          { value: '3', label: 'Admin' }
        ],
        value: this.user.role as unknown as string
      }),
    ];
  }

  onSubmit(user: User): void {
    this.userservice.update(user).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}

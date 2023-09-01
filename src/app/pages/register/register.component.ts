import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { AuthActions } from '@redux/auth/auth.actions'
import { ONE } from '@shared//constants'
import { CustomValidators } from '@shared/validators/custom-validators'

const PASSWORD_MIN_LENGTH = 8

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class RegisterComponent {
  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
  ) {}

  registerForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(ONE)]],
    lastName: [''],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(ONE),
        CustomValidators.NoSpaces,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
    ],
    confirmPassword: [
      '',
      [Validators.required, CustomValidators.PasswordMatch],
    ],
  })

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    const { name, lastName, username, password } = this.registerForm.value

    if (!name || !lastName || !username || !password) {
      return
    }

    this._store.dispatch(
      AuthActions.register({
        payload: {
          name,
          lastName,
          username,
          password,
        },
      }),
    )
  }
}

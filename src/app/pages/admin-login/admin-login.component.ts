import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { AuthActions, LoginType } from '@redux/auth/auth.actions'
import { selectAuthError } from '@redux/auth/auth.selectors'
import { selectConfig } from '@redux/config/config.selectors'
import { ONE } from '@shared//constants'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { distinctUntilChanged, map, shareReplay } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
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
export class AdminLoginComponent {
  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {}

  adminLoginForm = this._fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  })

  isRegisterEnabled$ = this._store.select(selectConfig).pipe(
    map(config => config?.registerEnabled),
    shareReplay({ bufferSize: ONE, refCount: true }),
    distinctUntilChanged(),
  )

  authError$ = this._store
    .select(selectAuthError)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  onSubmit() {
    if (this.adminLoginForm.invalid) return

    const username: string = this.adminLoginForm.get('username')?.value || ''
    const password: string = this.adminLoginForm.get('password')?.value || ''

    const credentials: AuthCredentials = { username, password }

    const rememberMe: boolean =
      this.adminLoginForm.get('rememberMe')?.value || false

    this._store.dispatch(
      AuthActions.login({
        credentials,
        rememberMe,
        loginType: LoginType.ADMIN,
      }),
    )
  }
}

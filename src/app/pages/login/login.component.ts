import { Component, OnDestroy } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { AuthActions, LoginType } from '@redux/auth/auth.actions'
import { WorkerActions } from '@redux/worker/worker.actions'
import {
  selectActiveWorkers,
  selectWorkerLoading,
} from '@redux/worker/worker.selectors'
import { ONE } from '@shared//constants'
import {
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs'

const PIN_LENGTH = 4

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(PIN_LENGTH),
        Validators.maxLength(PIN_LENGTH),
      ],
    ],
  })

  enablePadObserver$ = this.loginForm.get('username')?.valueChanges.pipe(
    takeUntil(this._unsubscribe$),
    tap(value => {
      if (value) {
        this.loginForm.get('password')?.enable()
      } else {
        this.loginForm.get('password')?.reset()
        this.loginForm.get('password')?.disable()
      }
    }),
  )

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {
    this._store.dispatch(WorkerActions.loadActiveWorkers())

    this.enablePadObserver$?.subscribe()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  loading$ = this._store
    .select(selectWorkerLoading)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  activeWorkers$ = this._store
    .select(selectActiveWorkers)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
      map(this._generateUserLabel),
    )

  valCheck: string[] = ['remember']

  private _generateUserLabel(user: any[]) {
    return user.map(u => ({
      ...u,
      label: `${u.name} ${u.lastName}`.trim(),
    }))
  }

  onLoginClick() {
    if (this.loginForm.invalid) return

    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    if (!username || !password) return

    const credentials = { username, password }

    this._store.dispatch(
      AuthActions.login({ credentials, loginType: LoginType.USER }),
    )
  }
}

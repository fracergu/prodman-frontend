import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { LoginComponent } from './login.component'
import { AppState } from '@redux/app.state'
import { AuthActions, LoginType } from '@redux/auth/auth.actions'
import { WorkerActions } from '@redux/worker/worker.actions'
import { of } from 'rxjs'
import { SharedModule } from '@shared/shared.module'
import { LoginModule } from './login.module'
import { RouterTestingModule } from '@angular/router/testing'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let store: MockStore<AppState>

  const initialState = {
    worker: {
      loading: false,
      activeWorkers: [
        {
          id: 1,
          name: 'testUser',
          lastName: 'testUser',
        },
      ],
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, LoginModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [provideMockStore({ initialState }), FormBuilder],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch WorkerActions.loadActiveWorkers on creation', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      WorkerActions.loadActiveWorkers(),
    )
  })

  it('should enable password field when username is not empty', () => {
    component.loginForm.get('username')?.setValue('testUser')
    expect(component.loginForm.get('password')?.enabled).toEqual(true)
  })

  it('should disable and reset password field when username is empty', () => {
    component.loginForm.get('username')?.setValue('')
    expect(component.loginForm.get('password')?.disabled).toEqual(true)
    expect(component.loginForm.get('password')?.value).toBe(null)
  })

  it('should dispatch AuthActions.login when credentials are valid', () => {
    component.loginForm.get('username')?.setValue('testUser')
    component.loginForm.get('password')?.setValue('1234')
    component.onLoginClick()
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        credentials: { username: 'testUser', password: '1234' },
        loginType: LoginType.USER,
      }),
    )
  })

  it('THEN: should not dispatch AuthActions.login when form is invalid', () => {
    component.loginForm.get('username')?.setValue('')
    component.loginForm.get('password')?.setValue('')
    component.onLoginClick()
    expect(store.dispatch).not.toHaveBeenCalledWith(
      AuthActions.login({
        credentials: { username: '', password: '' },
        loginType: LoginType.USER,
      }),
    )
  })
})

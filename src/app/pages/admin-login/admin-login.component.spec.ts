import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AdminLoginComponent } from './admin-login.component'
import { AppState } from '@redux/app.state'
import { AuthActions, LoginType } from '@redux/auth/auth.actions'
import { SharedModule } from '@shared/shared.module'
import { AdminLoginModule } from './admin-login.module'
import { RouterTestingModule } from '@angular/router/testing'

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent
  let fixture: ComponentFixture<AdminLoginComponent>
  let store: MockStore<AppState>

  const initialState = {
    auth: {
      error: null,
      // ... other initial states
    },
    config: {
      registerEnabled: true,
      // ... other initial states
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, AdminLoginModule, RouterTestingModule],
      declarations: [AdminLoginComponent],
      providers: [provideMockStore({ initialState }), FormBuilder],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(AdminLoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch AuthActions.login when credentials are valid', () => {
    component.adminLoginForm.get('username')?.setValue('testAdmin')
    component.adminLoginForm.get('password')?.setValue('adminPass')
    component.adminLoginForm.get('rememberMe')?.setValue(false)
    component.onSubmit()
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        credentials: { username: 'testAdmin', password: 'adminPass' },
        rememberMe: false,
        loginType: LoginType.ADMIN,
      }),
    )
  })

  it('should not dispatch AuthActions.login when form is invalid', () => {
    component.adminLoginForm.get('username')?.setValue('')
    component.adminLoginForm.get('password')?.setValue('')
    component.onSubmit()
    expect(store.dispatch).not.toHaveBeenCalled()
  })
})

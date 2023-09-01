import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AuthActions } from '@redux/auth/auth.actions'
import { AppState } from '@redux/app.state'
import { RegisterComponent } from './register.component'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { SharedModule } from '@shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)

    jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a form with initial state invalid', () => {
    expect(component.registerForm.invalid).toBeTruthy()
  })

  it('should dispatch register action when form is valid', () => {
    const payload = {
      name: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const { confirmPassword, ...payloadWithoutConfirmPassword } = payload

    component.registerForm.setValue(payload)
    component.onSubmit()

    const action = AuthActions.register({
      payload: payloadWithoutConfirmPassword,
    })
    expect(store.dispatch).toHaveBeenCalledWith(action)
  })

  it('should not dispatch register action when form is invalid', () => {
    component.registerForm.reset()
    component.onSubmit()
    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('should validate name as required', () => {
    component.registerForm.controls['name'].setValue('')
    expect(
      component.registerForm.controls['name'].hasError('required'),
    ).toBeTruthy()
  })

  it('should validate password with minimum length', () => {
    component.registerForm.controls['password'].setValue('short')
    expect(
      component.registerForm.controls['password'].hasError('minlength'),
    ).toBeTruthy()
  })
})

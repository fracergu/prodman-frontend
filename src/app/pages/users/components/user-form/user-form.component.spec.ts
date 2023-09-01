import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, Validators } from '@angular/forms'
import { UserFormComponent } from './user-form.component'
import { UserRequest } from '@shared/models/user-request.model'
import { UserResponse } from '@shared/models/user-response.model'
import { SharedModule } from '@shared/shared.module'
import { UsersModule } from '@pages/users/users.module'
import { AutoGenerateUsernameDirective } from '@shared/directives/auto-generate-username.directive'

describe('UserFormComponent', () => {
  let component: UserFormComponent
  let fixture: ComponentFixture<UserFormComponent>
  let formBuilder: FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [SharedModule, UsersModule],
      providers: [FormBuilder, AutoGenerateUsernameDirective],
    }).compileComponents()

    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance
    formBuilder = TestBed.inject(FormBuilder)
    component.userForm = formBuilder.group({})
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form with default values when no user is provided', () => {
    component.ngOnInit()
    expect(component.userForm.get('name')?.value).toBe('')
    expect(component.userForm.get('lastName')?.value).toBe('')
  })

  it('should initialize form with user values when user is provided', () => {
    component.user = {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      role: 'admin',
      active: true,
    } as UserResponse
    component.ngOnInit()
    expect(component.userForm.get('name')?.value).toBe('John')
    expect(component.userForm.get('lastName')?.value).toBe('Doe')
  })

  it('should emit submitEvent when form is valid and onSubmit is called', () => {
    jest.spyOn(component.submitEvent, 'emit')
    component.userForm = formBuilder.group({
      name: ['John'],
      lastName: ['Doe'],
      username: ['johndoe'],
      role: ['admin'],
      active: [true],
    })
    const formValue: UserRequest = {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      role: 'admin',
      active: true,
    }

    component.onSubmit()
    expect(component.submitEvent.emit).toHaveBeenCalledWith(formValue)
  })

  it('should NOT emit submitEvent when form is invalid', () => {
    jest.spyOn(component.submitEvent, 'emit')
    component.userForm = formBuilder.group({
      name: ['', Validators.required],
      lastName: [''],
      username: [''],
      role: [''],
      active: [true],
    })

    component.onSubmit()
    expect(component.submitEvent.emit).not.toHaveBeenCalled()
  })
})

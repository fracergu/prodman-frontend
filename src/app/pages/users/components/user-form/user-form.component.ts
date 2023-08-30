import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { AutoGenerateUsernameDirective } from '@shared/directives/auto-generate-username.directive'
import { UserRequest } from '@shared/models/user-request.model'
import { UserResponse, UserRolesObj } from '@shared/models/user-response.model'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user?: UserResponse
  @Input() isEdit = false
  @Output() submitEvent = new EventEmitter<UserRequest>()
  userForm!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _agud: AutoGenerateUsernameDirective,
  ) {}

  private _unsubscribe$ = new Subject<void>()

  get roles() {
    return UserRolesObj
  }

  ngOnInit(): void {
    this._initializeFormGroup()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitEvent.emit(
        this.isEdit
          ? { id: this.user?.id, ...this.userForm.getRawValue() }
          : this.userForm.getRawValue(),
      )
      if (!this.isEdit) {
        this.userForm.reset()
        this.userForm.get('active')?.setValue(true)
      }
    }
  }

  private _passwordMatchValidator(
    control: FormControl,
  ): { [key: string]: boolean } | null {
    if (control.parent) {
      const password = control.parent.get('password')?.value
      const confirmPassword = control.value

      if (password !== confirmPassword) {
        return { mismatch: true }
      }
    }
    return null
  }

  private _initializeFormGroup() {
    this.userForm = this._fb.group({
      name: [this.user?.name || '', Validators.required],
      lastName: [this.user?.lastName || ''],
      username: this._createUsernameFormControl(),
      role: this._createRoleFormControl(),
      active: [this._getActiveDefaultValue()],
      password: [{ value: '', disabled: true }, []],
      confirmPassword: [{ value: '', disabled: true }, []],
    })

    if (!this.isEdit) {
      this._subscribeToNameChanges()
      this._subscribeToLastNameChanges()
      this._subscribeToRoleChanges()
    }
  }

  private _createUsernameFormControl(): FormControl {
    return this._fb.control(
      { value: this.user?.username || '', disabled: this.isEdit },
      Validators.required,
    )
  }

  private _createRoleFormControl(): FormControl {
    const roleControl = this._fb.control(
      { value: this.user?.role || '', disabled: this.isEdit },
      Validators.required,
    )
    this._setupRoleFormControl(roleControl)
    return roleControl
  }

  private _setupRoleFormControl(roleControl: AbstractControl) {
    roleControl.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(role => {
        this._handleRoleChange(role)
      })
  }

  private _getActiveDefaultValue(): boolean {
    return this.user?.active !== undefined ? this.user?.active : true
  }

  private _subscribeToNameChanges() {
    this.userForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe(name => {
        this._agud.generateUsername(name, this.userForm.get('lastName')?.value)
      })
  }

  private _subscribeToLastNameChanges() {
    this.userForm
      .get('lastName')
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe(lastName => {
        this._agud.generateUsername(this.userForm.get('name')?.value, lastName)
      })
  }

  private _subscribeToRoleChanges() {
    const roleControl = this.userForm.get('role')
    if (roleControl) {
      this._setupRoleFormControl(roleControl)
    }
  }

  private _handleRoleChange(role: string) {
    const passwordControl = this.userForm.get('password')
    const confirmPasswordControl = this.userForm.get('confirmPassword')

    if (role === 'admin') {
      this._setupAdminRole(passwordControl, confirmPasswordControl)
    } else if (role === 'user') {
      this._setupUserRole(passwordControl)
    }
  }

  private _setupAdminRole(
    passwordControl: AbstractControl | null,
    confirmPasswordControl: AbstractControl | null,
  ) {
    if (passwordControl && confirmPasswordControl) {
      passwordControl.setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ])
      confirmPasswordControl.setValidators([
        Validators.required,
        this._passwordMatchValidator,
      ])
      passwordControl.enable()
      confirmPasswordControl.enable()
    }
  }

  private _setupUserRole(passwordControl: AbstractControl | null) {
    if (passwordControl) {
      passwordControl.setValidators([
        Validators.required,
        Validators.pattern(/^\d{4}$/),
      ])
      passwordControl.enable()
    }
  }
}

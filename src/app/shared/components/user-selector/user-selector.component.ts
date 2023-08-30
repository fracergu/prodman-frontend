import { Component, Input, OnDestroy } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { UsersService } from '@integration/users/users.service'
import {
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_FILTER_MIN_LENGTH,
  DEFAULT_PAGE_SIZE,
  ONE,
} from '@shared/constants'
import { DropdownChangeEvent, DropdownFilterEvent } from 'primeng/dropdown'
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs'

import { PaginatedResponse } from '../../models/paginated-response'
import { UserResponse, UserRole } from '../../models/user-response.model'

type LabeledUser = Partial<UserResponse> & { label: string }

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UserSelectorComponent,
      multi: true,
    },
  ],
})
export class UserSelectorComponent implements ControlValueAccessor, OnDestroy {
  @Input() role: UserRole = UserRole.USER

  private _unsubscribe$ = new Subject<void>()

  constructor(private _us: UsersService) {
    this.filterObs$
      .pipe(
        takeUntil(this._unsubscribe$),
        map(users => this._transformUsers(users)),
      )
      .subscribe(data => this.options$.next(data))
  }

  private _transformUsers(users: PaginatedResponse<UserResponse>) {
    return users.data.map(user => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      label: this._createDisplayLabel(user),
    }))
  }

  selectedUser: LabeledUser | null = null

  // ControlValueAccessor implementation

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {}
  disabled = false

  writeValue(obj: Partial<UserResponse> | null): void {
    if (obj) {
      this.selectedUser = { ...obj, label: this._createDisplayLabel(obj) }
      const currentOptions = this.options$.value

      if (!currentOptions.some(option => option.id === obj.id)) {
        this.options$.next([this.selectedUser, ...currentOptions])
      }
    } else {
      this.selectedUser = null
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  options$ = new BehaviorSubject<Partial<UserResponse>[]>([])

  filter$ = new Subject<string>()

  filterObs$ = this.filter$.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    filter(value => value.length >= DEFAULT_FILTER_MIN_LENGTH),
    switchMap(value =>
      this._us.getUsers({
        page: ONE,
        limit: DEFAULT_PAGE_SIZE,
        role: this.role,
        search: value,
      }),
    ),
  )

  onFilterUsers(event: DropdownFilterEvent) {
    if (event.filter === null) return
    this.filter$.next(event.filter)
  }

  private _createDisplayLabel(user: Partial<UserResponse>) {
    return `${user.name} ${user.lastName ? user.lastName : ''}`.trim()
  }

  onSelectChange(event: DropdownChangeEvent) {
    if (event.value === null) {
      this.selectedUser = null
      this.onChange(null)
    } else {
      const { label, ...user } = event.value
      this.selectedUser = event.value
      this.onChange(user)
    }
    this.onTouched()
  }
}

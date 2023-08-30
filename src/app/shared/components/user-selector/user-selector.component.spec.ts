import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { UsersService } from '@integration/users/users.service'
import { of } from 'rxjs'
import { UserSelectorComponent } from './user-selector.component'
import { DEFAULT_DEBOUNCE_TIME } from '../../constants'
import { UserRole } from '../../models/user-response.model'

describe('GIVEN: a UserSelectorComponent', () => {
  let fixture: ComponentFixture<UserSelectorComponent>
  let component: UserSelectorComponent
  let mockUsersService: Partial<UsersService>

  const mockUsers = [
    { id: 1, name: 'User 1', lastName: 'Last1' },
    { id: 2, name: 'User 2', lastName: 'Last2' },
    { id: 3, name: 'User 3', lastName: 'Last3' },
  ]

  beforeEach(async () => {
    mockUsersService = {
      getUsers: jest.fn().mockReturnValue(of({ data: mockUsers })),
    }

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserSelectorComponent],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: UserSelectorComponent,
          multi: true,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserSelectorComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should initialize with a null selectedUser', () => {
    expect(component.selectedUser).toBeNull()
  })

  it('THEN: should update selectedUser when writeValue is called', () => {
    const mockValue = { id: 1, name: 'User 1', lastName: 'Last1' }
    component.writeValue(mockValue)
    expect(component.selectedUser).toEqual({
      ...mockValue,
      label: 'User 1 Last1',
    })
  })

  it('THEN: should register onChange function when registerOnChange is called', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    const mockEvent = { value: { id: 1, name: 'User 1', lastName: 'Last1' } }
    component.onSelectChange(mockEvent as any)
    expect(fn).toHaveBeenCalledWith(mockEvent.value)
  })

  it('THEN: shoud set null when onSelectChange receives null', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    component.onSelectChange({ value: null } as any)
    expect(fn).toHaveBeenCalledWith(null)
  })

  it('THEN: should set selectedUser to null when writeValue receives null', () => {
    component.writeValue(null)
    expect(component.selectedUser).toBeNull()
  })

  it('THEN: should register onTouched function when registerOnTouched is called', () => {
    const fn = jest.fn()
    component.registerOnTouched(fn)
    const mockEvent = { value: { id: 1, name: 'User 1', lastName: 'Last1' } }
    component.onSelectChange(mockEvent as any)
    expect(fn).toHaveBeenCalled()
  })

  it('THEN: should set the disabled state when setDisabledState is called', () => {
    component.setDisabledState(true)
    expect(component.disabled).toBe(true)
  })

  it('should filter users when onFilterUsers is called', fakeAsync(() => {
    component.onFilterUsers({ filter: 'aFilterValue' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockUsersService.getUsers).toHaveBeenCalled()
  }))

  it('should not trigger filter when filter value is too short', fakeAsync(() => {
    component.onFilterUsers({ filter: 'ab' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockUsersService.getUsers).not.toHaveBeenCalled()
  }))

  it('THEN: should not call the filter service when onFilterUsers receives null', fakeAsync(() => {
    component.onFilterUsers({ filter: null } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockUsersService.getUsers).not.toHaveBeenCalled()
  }))

  it('THEN: should correctly handle UserRole input', () => {
    component.role = UserRole.ADMIN
    expect(component.role).toBe(UserRole.ADMIN)
  })
})

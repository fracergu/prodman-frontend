import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AppState } from '@redux/app.state'
import { UsersActions } from '@redux/users/users.actions'
import { UsersListComponent } from './users-list.component'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { OverlayPanel } from 'primeng/overlaypanel'
import { UserRequest } from '@shared/models/user-request.model'
import { USER_RESPONSE_MOCK } from '@mocks/user.mock'
import { UserResponse } from '@shared/models/user-response.model'
import { SharedModule } from '@shared/shared.module'

describe('GIVEN: UsersListComponent', () => {
  let component: UsersListComponent
  let fixture: ComponentFixture<UsersListComponent>
  let store: MockStore<AppState>

  const userRequestMock: UserRequest = USER_RESPONSE_MOCK as UserRequest

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [SharedModule],
      providers: [provideMockStore({ initialState }), FormBuilder],
    }).compileComponents()

    fixture = TestBed.createComponent(UsersListComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should handle page change events', () => {
    jest.spyOn(store, 'dispatch')

    component.onPageChange({ page: 1, rows: 10 })
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.loadUsers({
        params: { page: 2, limit: 10 },
      }),
    )
  })

  it('THEN: should dispatch createUser action when onCreate is called', () => {
    jest.spyOn(store, 'dispatch')

    const event: UserRequest = {
      ...userRequestMock,
    }
    const op = { hide() {} } as OverlayPanel
    component.onCreate(event, op)
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.createUser({ payload: event }),
    )
  })

  it('THEN: should dispatch updateUser action when onUpdate is called', () => {
    jest.spyOn(store, 'dispatch')

    const event: UserRequest = {
      ...userRequestMock,
    }
    const op = { hide() {} } as OverlayPanel
    component.onUpdate(event, op)
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.updateUser({ payload: event }),
    )
  })

  it('THEN: getUserName should return the user name', () => {
    const user = {
      name: 'John',
      lastName: 'Doe',
    } as UserResponse
    expect(component.getUserName(user)).toEqual('John Doe')
  })

  it('THEN: resetSearch should reset the search form', () => {
    const resetSpy = jest.spyOn(component.searchFormGroup, 'reset')
    component.resetSearch()
    expect(resetSpy).toHaveBeenCalled()
  })
})

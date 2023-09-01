import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UsersComponent } from './users.component'
import { UsersModule } from './users.module'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { AppState } from '@redux/app.state'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'

describe('GIVEN: UsersComponent', () => {
  let fixture: ComponentFixture<UsersComponent>
  let component: UsersComponent
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [UsersModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(UsersComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })
})

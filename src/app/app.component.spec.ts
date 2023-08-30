import { AppState } from '@redux/app.state'
import { AppComponent } from './app.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { SharedModule } from '@shared/shared.module'
import { MessageService } from 'primeng/api'
import { RouterTestingModule } from '@angular/router/testing'

describe('GIVEN: AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: MessageService,
          useValue: {
            add: jest.fn(),
            clear: jest.fn(),
          },
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
  })

  it('THEN: should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should have as title "Prodman"', () => {
    expect(component.title).toEqual('Prodman')
  })
})

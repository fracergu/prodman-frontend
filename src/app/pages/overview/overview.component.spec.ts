import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { OverviewComponent } from './overview.component'
import { AppState } from '@redux/app.state'
import { ProductionActions } from '@redux/production/production.actions'

describe('OverviewComponent', () => {
  let component: OverviewComponent
  let fixture: ComponentFixture<OverviewComponent>
  let store: MockStore<AppState>
  const initialState = {
    production: {
      loading: false,
      overview: null,
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(OverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch ProductionActions.loadOverview on creation', () => {
    const startDate = component.startDate.toISOString()
    const endDate = component.endDate.toISOString()
    const action = ProductionActions.loadOverview({
      params: { startDate, endDate },
    })

    expect(store.dispatch).toHaveBeenCalledWith(action)
  })
})

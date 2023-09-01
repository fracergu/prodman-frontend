import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewComponent } from './overview.component'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { PRODUCTION_REPORT_RESPONSE_MOCK } from '@mocks/production.mock'
import { AppState } from '@redux/app.state'
import { ProductionActions } from '@redux/production/production.actions'
import { SharedModule } from '@shared/shared.module'
import { OverviewModule } from './overview.module'
import 'jest-canvas-mock'

describe('OverviewComponent', () => {
  let component: OverviewComponent
  let fixture: ComponentFixture<OverviewComponent>
  let store: MockStore<AppState>

  describe('when overview is defined', () => {
    const initialState = {
      production: {
        loading: false,
        overview: PRODUCTION_REPORT_RESPONSE_MOCK,
        loaded: true,
      },
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [OverviewComponent],
        imports: [SharedModule, OverviewModule],
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

  describe('when overview is undefined', () => {
    const initialState = {
      production: {
        loading: false,
        overview: undefined,
        loaded: true,
      },
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [OverviewComponent],
        imports: [SharedModule, OverviewModule],
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
})

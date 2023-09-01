import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { ProductionListComponent } from './production-list.component'
import { AppState } from '@redux/app.state'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { SharedModule } from '@shared/shared.module'
import { ProductionActions } from '@redux/production/production.actions'

describe('GIVEN: ProductionListComponent', () => {
  let component: ProductionListComponent
  let fixture: ComponentFixture<ProductionListComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionListComponent],
      imports: [SharedModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(ProductionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should reset search form on resetSearch', () => {
    component.resetSearch()
    expect(component.searchFormGroup.value).toEqual({
      user: null,
      product: null,
      dateRanges: component.defaultDateRanges,
    })
  })

  describe('WHEN: getUsername', () => {
    it('THEN: should return user name without lastname', () => {
      const user = {
        id: 1,
        name: 'John',
      }
      expect(component.getUserName(user)).toEqual('John')
    })

    it('THEN: should return user name with lastname', () => {
      const user = {
        id: 1,
        name: 'John',
        lastName: 'Doe',
      }
      expect(component.getUserName(user)).toEqual('John Doe')
    })
  })

  describe('WHEN: onPageChange', () => {
    it('THEN: should dispatch loadProduction with page', () => {
      const event = {
        page: 2,
        rows: 15,
      }
      component.onPageChange(event)
      expect(store.dispatch).toHaveBeenCalledWith(
        ProductionActions.loadProduction({
          params: {
            startDate: component.defaultDateRanges[0].toISOString(),
            endDate: component.defaultDateRanges[1].toISOString(),
            page: event.page + 1,
            limit: event.rows,
            productId: undefined,
            userId: undefined,
          },
        }),
      )
    })
    it('THEN: should dispatch loadProduction with default page', () => {
      const event = {
        rows: 15,
      }
      component.onPageChange(event)
      expect(store.dispatch).toHaveBeenCalledWith(
        ProductionActions.loadProduction({
          params: {
            startDate: component.defaultDateRanges[0].toISOString(),
            endDate: component.defaultDateRanges[1].toISOString(),
            page: 1,
            limit: event.rows,
            productId: undefined,
            userId: undefined,
          },
        }),
      )
    })
  })
})

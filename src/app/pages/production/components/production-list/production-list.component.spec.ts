import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { ProductionListComponent } from './production-list.component'
import { AppState } from '@redux/app.state'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'

describe('ProductionListComponent', () => {
  let component: ProductionListComponent
  let fixture: ComponentFixture<ProductionListComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionListComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(ProductionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should reset search form on resetSearch', () => {
    component.resetSearch()
    expect(component.searchFormGroup.value).toEqual({
      user: null,
      product: null,
      dateRanges: component.defaultDateRanges,
    })
  })
})

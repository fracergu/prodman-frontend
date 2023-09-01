import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { ProductsListComponent } from './products-list.component'
import { AppState } from '@redux/app.state'
import { ProductsActions } from '@redux/products/products.actions'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { DEFAULT_PAGE_SIZE, ONE } from '@shared/constants'
import { fakeAsync, tick } from '@angular/core/testing'
import { SharedModule } from '@shared/shared.module'

describe('ProductsListComponent', () => {
  let component: ProductsListComponent
  let fixture: ComponentFixture<ProductsListComponent>
  let store: MockStore<AppState>
  let dispatchSpy: jest.SpyInstance

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [SharedModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    dispatchSpy = jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(ProductsListComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch loadProducts action on component creation', () => {
    const action = ProductsActions.loadProducts({
      params: { page: ONE, limit: DEFAULT_PAGE_SIZE },
    })
    expect(dispatchSpy).toHaveBeenCalledWith(action)
  })

  it('THEN: should dispatch loadProducts action when search form changes', fakeAsync(() => {
    const search = 'product'
    component.searchFormGroup.patchValue({ search })
    tick(500)
    expect(dispatchSpy).toHaveBeenCalledWith(
      ProductsActions.loadProducts({
        params: { page: ONE, limit: DEFAULT_PAGE_SIZE, search },
      }),
    )
  }))

  it('THEN: should dispatch loadProducts action when page changes', () => {
    const page = 2
    component.onPageChange({ page, rows: DEFAULT_PAGE_SIZE })
    expect(dispatchSpy).toHaveBeenCalledWith(
      ProductsActions.loadProducts({
        params: { page: page + 1, limit: DEFAULT_PAGE_SIZE },
      }),
    )
  })

  it('should dispatch createProduct action on create', () => {
    const payload = { name: 'New Product' }
    component.onCreateProduct(payload)

    const action = ProductsActions.createProduct({ payload })
    expect(dispatchSpy).toHaveBeenCalledWith(action)
  })

  it('should dispatch updateProduct action on update', () => {
    const payload = { id: 1, name: 'Updated Product' }
    component.onUpdateProduct(payload)

    const action = ProductsActions.updateProduct({ payload })
    expect(dispatchSpy).toHaveBeenCalledWith(action)
  })

  it('should reset the search form', () => {
    component.searchFormGroup.patchValue({ search: 'product' })
    component.resetSearch()
    expect(component.searchFormGroup.get('search')?.value).toEqual(null)
  })
})

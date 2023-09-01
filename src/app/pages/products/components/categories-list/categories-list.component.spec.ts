import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { CategoriesListComponent } from './categories-list.component'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AppState } from '@redux/app.state'
import { CategoriesActions } from '@redux/categories/categories.actions'
import { OverlayPanel } from 'primeng/overlaypanel'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { Category } from '@shared/models/product-response.model'
import { SharedModule } from '@shared/shared.module'
import { ProductsModule } from '@pages/products/products.module'

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent
  let fixture: ComponentFixture<CategoriesListComponent>
  let store: MockStore<AppState>

  let dispatchSpy: jest.SpyInstance

  const initialMockState: AppState = {
    ...initialState,
    categories: {
      entities: {
        1: {
          id: 1,
          name: 'Category 1',
          description: 'Category 1 description',
        },
        2: {
          id: 2,
          name: 'Category 2',
          description: 'Category 2 description',
        },
      },
      ids: [1, 2],
      loading: false,
      loaded: true,
    },
  }

  const mockOverlayPanel = { hide: () => {} } as OverlayPanel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
      imports: [SharedModule, ProductsModule],
      providers: [
        FormBuilder,
        provideMockStore({ initialState: initialMockState }),
      ],
    }).compileComponents()

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(CategoriesListComponent)
    component = fixture.componentInstance
    dispatchSpy = jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call updateCategory and hide overlay on onUpdate', () => {
    const updatedCategory: Category = {
      id: 1,
      name: 'Updated Category',
      description: 'Updated description',
    }

    component.onUpdate(updatedCategory, mockOverlayPanel)

    expect(dispatchSpy).toHaveBeenCalledWith(
      CategoriesActions.updateCategory({ payload: updatedCategory }),
    )
  })

  it('should call deleteCategory and hide overlay onDelete', () => {
    jest.spyOn(store, 'dispatch')

    component.onDelete(1, mockOverlayPanel)

    expect(dispatchSpy).toHaveBeenCalledWith(
      CategoriesActions.deleteCategory({ id: 1 }),
    )
  })

  it('should call createCategory and hide overlay onCreate', () => {
    jest.spyOn(store, 'dispatch')

    const newCategory: Category = {
      id: 1,
      name: 'New Category',
      description: 'New description',
    }

    component.onCreate(newCategory, mockOverlayPanel)

    expect(dispatchSpy).toHaveBeenCalledWith(
      CategoriesActions.createCategory({ payload: newCategory }),
    )
  })

  it('should reset search form on resetSearch', () => {
    component.resetSearch()

    expect(component.searchFormGroup.value).toEqual({ search: '' })
  })
})

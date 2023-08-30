import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ProductsService } from '@integration/products/products.service'
import { of, Subject } from 'rxjs'
import { ProductSelectorComponent } from './product-selector.component'
import { DEFAULT_DEBOUNCE_TIME } from '../../constants'
import { ProductResponse } from '../../models/product-response.model'
import { PRODUCT_REPONSE_MOCK } from '@mocks/product.mock'

describe('GIVEN: ProductSelectorComponent', () => {
  let fixture: ComponentFixture<ProductSelectorComponent>
  let component: ProductSelectorComponent
  let mockProductsService: Partial<ProductsService>
  let mockFilter$: Subject<string>

  const mockProducts: ProductResponse[] = PRODUCT_REPONSE_MOCK

  beforeEach(async () => {
    mockFilter$ = new Subject<string>()
    mockProductsService = {
      getProducts: jest.fn().mockReturnValue(of({ data: mockProducts })),
    }

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductSelectorComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: ProductSelectorComponent,
          multi: true,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductSelectorComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should initialize with a null selectedProduct', () => {
    expect(component.selectedProduct).toBeNull()
  })

  it('THEN: should update selectedProduct when writeValue is called', () => {
    const mockValue: ProductResponse = mockProducts[0]
    component.writeValue(mockValue)
    expect(component.selectedProduct).toEqual(mockValue)
  })

  it('THEN: should register onChange function when registerOnChange is called', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    const mockEvent = {
      value: mockProducts[0],
    }
    component.onSelectChange(mockEvent as any)
    expect(fn).toHaveBeenCalledWith(mockEvent.value)
  })

  it('THEN: should register onTouched function when registerOnTouched is called', () => {
    const fn = jest.fn()
    component.registerOnTouched(fn)
    component.onSelectChange({ value: null } as any)
    expect(fn).toHaveBeenCalled()
  })

  it('THEN: should set the disabled state when setDisabledState is called', () => {
    component.setDisabledState(true)
    expect(component.disabled).toBe(true)
  })

  it('should filter products when onFilterProducts is called', fakeAsync(() => {
    component.onFilterProducts({ filter: 'filterValue' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).toHaveBeenCalled()
  }))

  it('should not trigger filter when filter value is too short', fakeAsync(() => {
    component.onFilterProducts({ filter: 'sh' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).not.toHaveBeenCalled()
  }))

  it('THEN: should not call the filter service when onFilterProducts receives null', fakeAsync(() => {
    component.onFilterProducts({ filter: null } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).not.toHaveBeenCalled()
  }))
})

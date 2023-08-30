import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProductMultiSelectorComponent } from './product-multi-selector.component'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ProductsService } from '@integration/products/products.service'
import { of } from 'rxjs'
import { fakeAsync, tick } from '@angular/core/testing'
import { DEFAULT_DEBOUNCE_TIME } from '@shared/constants'

describe('GIVEN: ProductMultiSelectorComponent', () => {
  let fixture: ComponentFixture<ProductMultiSelectorComponent>
  let component: ProductMultiSelectorComponent
  let mockProductsService: Partial<ProductsService>

  const mockProducts = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]

  beforeEach(async () => {
    mockProductsService = {
      getProducts: jest.fn().mockReturnValue(of({ data: mockProducts })),
    }

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductMultiSelectorComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: ProductMultiSelectorComponent,
          multi: true,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductMultiSelectorComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should initialize with an empty array of selectedProducts', () => {
    expect(component.selectedProducts).toEqual([])
  })

  it('THEN: should update selectedProducts when writeValue is called', () => {
    const mockValue = [{ id: 1, name: 'Product 1' }]
    component.writeValue(mockValue)
    expect(component.selectedProducts).toEqual(mockValue)
  })

  it('THEN: should register onChange function when registerOnChange is called', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    const mockEvent = { value: [{ id: '1', name: 'Product 1' }] }
    component.onSelectorChange(mockEvent as any)
    expect(fn).toHaveBeenCalledWith(mockEvent.value)
  })

  it('THEN: should register onTouched function when registerOnTouched is called', () => {
    const fn = jest.fn()
    component.registerOnTouched(fn)
    const mockEvent = { value: [{ id: '1', name: 'Product 1' }] }
    component.onSelectorChange(mockEvent as any)
    expect(fn).toHaveBeenCalled()
  })

  it('THEN: should set the disabled state when setDisabledState is called', () => {
    component.setDisabledState(true)
    expect(component.disabled).toBe(true)
  })

  it('THEN: should clear the selectedProducts when onClearSelector is called', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    component.onClearSelector()
    expect(component.selectedProducts).toEqual([])
    expect(fn).toHaveBeenCalledWith([])
  })

  it('should filter products when onFilterChange is called', fakeAsync(() => {
    component.onFilterChange({ filter: 'aFilterValue' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).toHaveBeenCalled()
  }))

  it('should not trigger filter when filter value is too short', fakeAsync(() => {
    component.onFilterChange({ filter: 'ab' } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).not.toHaveBeenCalled()
  }))

  it('THEN: should not include discarded products in selectedProducts when writeValue is called', () => {
    const mockValue = [
      { id: 1, name: 'Product 1' },
      { id: 4, name: 'Product 4 (discarded)' },
    ]
    component.discartedProducts = [{ id: 4, name: 'Product 4 (discarded)' }]
    component.writeValue(mockValue)
    expect(component.selectedProducts).toEqual([{ id: 1, name: 'Product 1' }])
  })

  it('THEN: should not call the filter service when onFilterChange receives null', fakeAsync(() => {
    component.onFilterChange({ filter: null } as any)
    tick(DEFAULT_DEBOUNCE_TIME)
    expect(mockProductsService.getProducts).not.toHaveBeenCalled()
  }))
})

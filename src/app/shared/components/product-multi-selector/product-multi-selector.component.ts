import { Component, Input, OnDestroy } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ProductsService } from '@integration/products/products.service'
import { DropdownChangeEvent, DropdownFilterEvent } from 'primeng/dropdown'
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs'

import {
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_FILTER_MIN_LENGTH,
  DEFAULT_PAGE_SIZE,
  ONE,
} from '../../constants'
import { ProductResponse } from '../../models/product-response.model'

@Component({
  selector: 'app-product-multi-selector',
  templateUrl: './product-multi-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProductMultiSelectorComponent,
      multi: true,
    },
  ],
})
export class ProductMultiSelectorComponent
  implements ControlValueAccessor, OnDestroy
{
  @Input() placeholder = 'Seleccione productos'
  @Input() discartedProducts: Partial<ProductResponse>[] = []

  private _unsubscribe$ = new Subject<void>()

  constructor(private _ps: ProductsService) {
    this.filterObs$
      .pipe(
        takeUntil(this._unsubscribe$),
        map(products => products.map(this._productToView.bind(this))),
        map(data => this._getUpdatedOptions(data)),
      )
      .subscribe(updatedOptions => this.options$.next(updatedOptions))
  }

  private _getUniqueOptions(options: Partial<ProductResponse>[]) {
    return options.filter(
      (option, index, array) =>
        index === array.findIndex(p => p.id === option.id),
    )
  }

  private _getUpdatedOptions(data: Partial<ProductResponse>[]) {
    const currentOptions = this.options$.value || []
    const mergedOptions = [...currentOptions, ...data]
    const uniqueOptions = this._getUniqueOptions(mergedOptions)
    return uniqueOptions
  }

  selectedProducts: Partial<ProductResponse>[] = []

  // ControlValueAccessor implementation

  onChange: any = () => {}
  onTouched: any = () => {}
  disabled = false

  writeValue(obj: Partial<ProductResponse>[]): void {
    if (obj) {
      this.selectedProducts = obj
        .map(this._productToView.bind(this))
        .filter(
          product => !this.discartedProducts.some(dp => dp.id === product.id),
        )

      const currentOptions = this.options$.value || []
      const mergedOptions = [...currentOptions, ...this.selectedProducts]
      const uniqueOptions = mergedOptions.filter(
        (option, index, array) =>
          index === array.findIndex(p => p.id === option.id),
      )
      this.options$.next(uniqueOptions)
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  options$ = new BehaviorSubject<Partial<ProductResponse>[]>([])

  selectedProductsToView$ = new BehaviorSubject<Partial<ProductResponse>[]>(
    this.selectedProducts.map(this._productToView.bind(this)),
  )

  filter$ = new Subject<string>()

  filterObs$ = this.filter$.pipe(
    filter(value => value.length >= DEFAULT_FILTER_MIN_LENGTH),
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    switchMap(value => this._getFilteredProducts(value)),
    map(products => this._filterDiscardedProducts(products.data)),
    map(products => products.map(this._productToView.bind(this))),
  )

  private _getFilteredProducts(value: string) {
    return this._ps.getProducts({
      page: ONE,
      limit: DEFAULT_PAGE_SIZE,
      search: value,
    })
  }

  private _filterDiscardedProducts(products: Partial<ProductResponse>[]) {
    return products.filter(product => this._isNotDiscarded(product))
  }

  private _isNotDiscarded(product: Partial<ProductResponse>): boolean {
    return !this.discartedProducts.some(dp => dp.id === product.id)
  }

  onFilterChange(event: DropdownFilterEvent) {
    if (event.filter === null) return
    this.filter$.next(event.filter)
  }

  onClearSelector() {
    this.selectedProducts = []
    this.onChange(this.selectedProducts)
    this.onTouched()
  }

  onSelectorChange(event: DropdownChangeEvent) {
    this.selectedProducts = event.value
    this.onChange(this.selectedProducts)
    this.onTouched()
  }

  private _productToView(product: Partial<ProductResponse>) {
    return {
      id: product.id,
      name: product.name,
    }
  }
}

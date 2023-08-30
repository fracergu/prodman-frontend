import { Component, OnDestroy } from '@angular/core'
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
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProductSelectorComponent,
      multi: true,
    },
  ],
})
export class ProductSelectorComponent
  implements ControlValueAccessor, OnDestroy
{
  private _unsubscribe$ = new Subject<void>()

  selectedProduct: ProductResponse | null = null

  constructor(private _ps: ProductsService) {
    this.filterObs$
      .pipe(
        takeUntil(this._unsubscribe$),
        map(products => products.data),
      )
      .subscribe(data => this.options$.next(data))
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  options$ = new BehaviorSubject<ProductResponse[]>([])

  filter$ = new Subject<string>()

  filterObs$ = this.filter$.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    filter(value => value.length >= DEFAULT_FILTER_MIN_LENGTH),
    switchMap(value =>
      this._ps.getProducts({
        page: ONE,
        limit: DEFAULT_PAGE_SIZE,
        search: value,
      }),
    ),
  )

  onSelectChange(event: DropdownChangeEvent) {
    if (event.value === null) {
      this.selectedProduct = null
      this.onChange(null)
    } else {
      this.selectedProduct = event.value
      this.onChange(event.value)
    }
    this.onTouched()
  }

  onFilterProducts(event: DropdownFilterEvent) {
    if (event.filter === null) return
    this.filter$.next(event.filter)
  }

  // ControlValueAccessor implementation

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {}
  disabled = false

  writeValue(obj: ProductResponse | null): void {
    this.selectedProduct = obj
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
}

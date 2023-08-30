import { Component, OnDestroy, ViewChild } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { selectCategories } from '@redux/categories/categories.selectors'
import { ProductsActions } from '@redux/products/products.actions'
import {
  selectProducts,
  selectProductsNextPage,
  selectProductsPrevPage,
  selectProductsTotalItems,
} from '@redux/products/products.selectors'
import {
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  ONE,
} from '@shared//constants'
import { ProductRequest } from '@shared/models/product-request.model'
import { Category } from '@shared/models/product-response.model'
import { Paginator, PaginatorState } from 'primeng/paginator'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
  takeUntil,
} from 'rxjs'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  @ViewChild('paginator') paginator!: Paginator

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
  ) {
    this._store.dispatch(
      ProductsActions.loadProducts({
        params: { page: ONE, limit: DEFAULT_PAGE_SIZE },
      }),
    )

    this._searchFormGroupChanges$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this._dispatchWithQuery()
      })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  searchFormGroup = this._fb.group({
    search: [''],
    inactive: [false],
    category: [{} as Category],
  })

  private _searchFormGroupChanges$ = this.searchFormGroup.valueChanges.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
  )

  categories$ = this._store
    .select(selectCategories)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  products$ = this._store
    .select(selectProducts)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  nextPage$ = this._store
    .select(selectProductsNextPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  prevPage$ = this._store
    .select(selectProductsPrevPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  totalItems$ = this._store
    .select(selectProductsTotalItems)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  hasPagination$ = this.totalItems$.pipe(
    map(totalItems => totalItems && totalItems > DEFAULT_PAGE_SIZE),
  )

  private _dispatchWithQuery(customPage?: number) {
    const { page, limit, ...query } = this._generateSearchQuery()
    this._store.dispatch(
      ProductsActions.loadProducts({
        params: {
          page: customPage || page,
          limit: DEFAULT_PAGE_SIZE,
          ...query,
        },
      }),
    )
  }

  onPageChange(event: PaginatorState) {
    this._dispatchWithQuery(event.page ? event.page + ONE : ONE)
  }

  onCreateProduct(product: ProductRequest) {
    this._store.dispatch(ProductsActions.createProduct({ payload: product }))
  }

  onUpdateProduct(product: ProductRequest) {
    this._store.dispatch(
      ProductsActions.updateProduct({
        payload: product,
      }),
    )
  }

  resetSearch() {
    this.searchFormGroup.reset()
  }

  private _generateSearchQuery() {
    const search = this.searchFormGroup.get('search')?.value
    const inactive = this.searchFormGroup.get('inactive')?.value
    const category = this.searchFormGroup.get('category')?.value

    const query = {
      page: ONE,
      limit: DEFAULT_PAGE_SIZE,
      search: search?.trim() || undefined,
      category: category?.id || undefined,
      inactive: inactive || undefined,
    }

    return query
  }
}

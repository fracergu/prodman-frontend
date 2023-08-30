import { Component, OnDestroy, ViewChild } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { ProductionActions } from '@redux/production/production.actions'
import {
  selectProduction,
  selectProductionNextPage,
  selectProductionPrevPage,
  selectProductionTotalItems,
} from '@redux/production/production.selectors'
import {
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  ONE,
  ZERO,
} from '@shared//constants'
import { ProductResponse } from '@shared/models/product-response.model'
import { UserResponse } from '@shared/models/user-response.model'
import { Paginator, PaginatorState } from 'primeng/paginator'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
} from 'rxjs'

type SearchFormGroup = {
  user?: UserResponse | null
  product?: ProductResponse | null
  dateRanges?: Date[] | null
}

const MAX_DATE_HOURS = 23
const MAX_DATE_MINUTES = 59
const MAX_DATE_SECONDS = 59
const MAX_DATE_MILLISECONDS = 999

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
})
export class ProductionListComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  @ViewChild('paginator') paginator!: Paginator

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
  ) {
    this._dispatchWithQuery()

    this._searchForgroupChanges$.subscribe(() => {
      this._dispatchWithQuery()
    })
  }

  maxDate = new Date()

  private _defaultDateRanges = [
    new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
    new Date(),
  ]

  searchFormGroup = this._fb.group({
    user: null,
    product: null,
    dateRanges: [this._defaultDateRanges],
  })

  private _searchForgroupChanges$ = this.searchFormGroup.valueChanges.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
  )

  productions$ = this._store
    .select(selectProduction)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  nextPage$ = this._store
    .select(selectProductionNextPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  prevPage$ = this._store
    .select(selectProductionPrevPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  totalItems$ = this._store
    .select(selectProductionTotalItems)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  hasPagination$ = this.totalItems$.pipe(
    map(totalItems => totalItems && totalItems > DEFAULT_PAGE_SIZE),
  )

  private _generateSearchQuery() {
    const formValue: SearchFormGroup = this.searchFormGroup.value

    const userId = formValue.user?.id
    const productId = formValue.product?.id

    const startDate = formValue.dateRanges
      ? new Date(
          formValue.dateRanges[0].setHours(ZERO, ZERO, ZERO, ZERO),
        ).toISOString()
      : undefined
    const endDate = formValue.dateRanges
      ? new Date(
          formValue.dateRanges[1].setHours(
            MAX_DATE_HOURS,
            MAX_DATE_MINUTES,
            MAX_DATE_SECONDS,
            MAX_DATE_MILLISECONDS,
          ),
        ).toISOString()
      : undefined

    const query = {
      page: ONE,
      limit: DEFAULT_PAGE_SIZE,
      userId: userId ? userId : undefined,
      productId: productId ? productId : undefined,
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
    }

    return query
  }

  private _dispatchWithQuery(customPage?: number) {
    const { page, limit, ...query } = this._generateSearchQuery()
    this._store.dispatch(
      ProductionActions.loadProductions({
        params: {
          page: customPage || page,
          limit: DEFAULT_PAGE_SIZE,
          ...query,
        },
      }),
    )
  }

  getUserName(user: { id: number; name: string; lastName: string }) {
    return `${user.name} ${user.lastName ? user.lastName : ''}`.trim()
  }

  onPageChange(event: PaginatorState) {
    this._dispatchWithQuery(event.page ? event.page + ONE : ONE)
  }

  resetSearch() {
    this.searchFormGroup.setValue({
      user: null,
      product: null,
      dateRanges: this._defaultDateRanges,
    })
  }
}

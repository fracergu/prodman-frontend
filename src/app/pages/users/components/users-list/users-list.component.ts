import { Component, OnDestroy, ViewChild } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { UsersActions } from '@redux/users/users.actions'
import {
  selectUsers,
  selectUsersNextPage,
  selectUsersPrevPage,
  selectUsersTotalItems,
} from '@redux/users/users.selectors'
import {
  DEFAULT_DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  ONE,
} from '@shared//constants'
import {
  UserRequest,
  UserSearchParameters,
} from '@shared/models/user-request.model'
import { UserResponse } from '@shared/models/user-response.model'
import { OverlayPanel } from 'primeng/overlaypanel'
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
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [
    `
      .p-dataView-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
      }
    `,
  ],
})
export class UsersListComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  @ViewChild('paginator') paginator!: Paginator

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {
    this._store.dispatch(
      UsersActions.loadUsers({
        params: { page: ONE, limit: DEFAULT_PAGE_SIZE },
      }),
    )

    this._searchFormGroupChanges$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        const query = this._generateSearchQuery()

        this._store.dispatch(
          UsersActions.loadUsers({
            params: {
              ...query,
              page: ONE,
              limit: DEFAULT_PAGE_SIZE,
            },
          }),
        )
      })
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  searchFormGroup = this._fb.group({
    search: [''],
    adminRole: [false],
    userRole: [false],
    inactive: [false],
  })

  private _searchFormGroupChanges$ = this.searchFormGroup.valueChanges.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
  )

  users$ = this._store
    .select(selectUsers)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  nextPage$ = this._store
    .select(selectUsersNextPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  prevPage$ = this._store
    .select(selectUsersPrevPage)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  totalItems$ = this._store
    .select(selectUsersTotalItems)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  hasPagination$ = this.totalItems$.pipe(
    map(totalItems => totalItems && totalItems > DEFAULT_PAGE_SIZE),
  )

  onPageChange(event: PaginatorState) {
    const query = this._generateSearchQuery()
    const { page, rows } = event

    this._store.dispatch(
      UsersActions.loadUsers({
        params: {
          ...query,
          page: page ? page + ONE : ONE,
          limit: rows || DEFAULT_PAGE_SIZE,
        },
      }),
    )
  }

  getUserName(user: UserResponse) {
    return `${user.name} ${user.lastName ? user.lastName : ''}`.trim()
  }

  resetSearch() {
    this.searchFormGroup.reset()
  }

  onCreate(event: UserRequest, op: OverlayPanel) {
    this._store.dispatch(UsersActions.createUser({ payload: event }))
    op.hide()
  }

  onUpdate(event: UserRequest, op: OverlayPanel) {
    this._store.dispatch(UsersActions.updateUser({ payload: event }))
    op.hide()
  }

  private _generateSearchQuery() {
    const searchValue = this.searchFormGroup.get('search')?.value || undefined
    const adminRoleValue = this.searchFormGroup.get('adminRole')?.value || false
    const userRoleValue = this.searchFormGroup.get('userRole')?.value || false
    const inactiveValue = this.searchFormGroup.get('inactive')?.value || false

    const query: UserSearchParameters = {
      page: ONE,
      limit: DEFAULT_PAGE_SIZE,
      search: searchValue?.trim() || undefined,
      role:
        (adminRoleValue && userRoleValue) || (!adminRoleValue && !userRoleValue)
          ? undefined
          : adminRoleValue
          ? 'admin'
          : 'user',
      inactive: inactiveValue ? true : undefined,
    }

    return query
  }
}

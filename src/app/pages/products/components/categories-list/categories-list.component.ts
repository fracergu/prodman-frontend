import { Component, OnDestroy } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { CategoriesActions } from '@redux/categories/categories.actions'
import { selectCategories } from '@redux/categories/categories.selectors'
import { DEFAULT_DEBOUNCE_TIME } from '@shared//constants'
import { Category } from '@shared/models/product-response.model'
import { OverlayPanel } from 'primeng/overlaypanel'
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {
    this._store.dispatch(CategoriesActions.loadCategories({ params: {} }))

    this._searchFormGroupChanges$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(({ search }) => {
        const params = {
          search: search !== null ? search : undefined,
        }
        this._store.dispatch(CategoriesActions.loadCategories({ params }))
      })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  categories$ = this._store.select(selectCategories)

  searchFormGroup = this._fb.group({
    search: [''],
  })

  private _searchFormGroupChanges$ = this.searchFormGroup.valueChanges.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
  )

  onCreate(category: Category, op: OverlayPanel): void {
    this._store.dispatch(
      CategoriesActions.createCategory({ payload: category }),
    )
    op.hide()
  }

  onUpdate(updatedCategory: Category, op: OverlayPanel): void {
    this._store.dispatch(
      CategoriesActions.updateCategory({ payload: updatedCategory }),
    )
    op.hide()
  }

  onDelete(id: number, op: OverlayPanel): void {
    this._store.dispatch(CategoriesActions.deleteCategory({ id }))
    op.hide()
  }

  resetSearch(): void {
    this.searchFormGroup.reset({ search: '' })
  }
}

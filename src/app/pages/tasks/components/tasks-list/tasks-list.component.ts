import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { TasksActions } from '@redux/tasks/tasks.actions'
import {
  selectTasks,
  selectTasksNextPage,
  selectTasksPrevPage,
  selectTasksTotalItems,
} from '@redux/tasks/tasks.selectors'
import { DEFAULT_DEBOUNCE_TIME, ONE } from '@shared//constants'
import { TasksSearchParameters, TaskStatus } from '@shared/models/task.model'
import { TaskRequest } from '@shared/models/task-request.model'
import { UserResponse, UserRole } from '@shared/models/user-response.model'
import { OverlayPanel } from 'primeng/overlaypanel'
import {
  debounceTime,
  distinctUntilChanged,
  shareReplay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs'

const TASK_PAGE_SIZE = 15

type SearchFormData = {
  status?: FormStatus
  user?: FormUser
  fromDate?: string | null
}

type FormStatus = { label: string; value: TaskStatus } | null

type FormUser = (UserResponse & { label: string }) | null

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
})
export class TasksListComponent {
  private _unsubscribe$ = new Subject<void>()

  searchFormGroup = this._fb.group({
    status: null,
    user: null,
    fromDate: [''],
  })

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {
    this._store.dispatch(
      TasksActions.loadTasks({ params: { page: ONE, limit: TASK_PAGE_SIZE } }),
    )

    this._searchFormGroupChanges$
      .pipe(
        takeUntil(this._unsubscribe$),
        tap(() => {
          const params = this._generateSearchQuery()
          this._store.dispatch(TasksActions.loadTasks({ params }))
        }),
      )
      .subscribe()
  }

  calendarMaxDate = new Date()

  tasksStatuses = [
    { label: 'Pendiente', value: TaskStatus.Pending },
    { label: 'Cancelada', value: TaskStatus.Cancelled },
    { label: 'Completada', value: TaskStatus.Completed },
  ]

  private _searchFormGroupChanges$ = this.searchFormGroup.valueChanges.pipe(
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
  )

  tasks$ = this._store.select(selectTasks).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  nextPage$ = this._store.select(selectTasksNextPage).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  prevPage$ = this._store.select(selectTasksPrevPage).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  totalItems$ = this._store.select(selectTasksTotalItems).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  getUserName(user: UserResponse) {
    return `${user.name} ${user.lastName !== null ? user.lastName : ''}`.trim()
  }

  get UserRole() {
    return UserRole
  }

  getStatusTagColor(status: TaskStatus) {
    switch (status) {
      case TaskStatus.Pending:
        return 'warning'
      case TaskStatus.Cancelled:
        return 'danger'
      case TaskStatus.Completed:
        return 'success'
      default:
        return 'light'
    }
  }

  getStatusTagText(status: TaskStatus) {
    switch (status) {
      case TaskStatus.Pending:
        return 'Pendiente'
      case TaskStatus.Cancelled:
        return 'Cancelada'
      case TaskStatus.Completed:
        return 'Completada'
      default:
        return 'Desconocido'
    }
  }

  onPageChange(): void {
    const { page, limit, ...query } = this._generateSearchQuery()
    this._store.dispatch(
      TasksActions.loadTasks({ params: { page: page + ONE, limit, ...query } }),
    )
  }

  onCreateTask(task: TaskRequest, overlayPanel: OverlayPanel) {
    this._store.dispatch(TasksActions.createTask({ payload: task }))
    overlayPanel.hide()
  }

  onUpdateTask(task: TaskRequest, overlayPanel: OverlayPanel) {
    this._store.dispatch(TasksActions.updateTask({ payload: task }))
    overlayPanel.hide()
  }

  private _generateSearchQuery() {
    const formValue: SearchFormData = this.searchFormGroup.value

    const statusValue = formValue.status?.value
    const userIdValue = formValue.user?.id
    const fromDateValue = formValue.fromDate

    const query: TasksSearchParameters = {
      page: ONE,
      limit: TASK_PAGE_SIZE,
      status: statusValue ? statusValue : undefined,
      userId: userIdValue,
      fromDate: fromDateValue ? new Date(fromDateValue) : undefined,
    }

    return query
  }
}

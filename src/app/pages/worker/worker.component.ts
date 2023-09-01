import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { AuthActions } from '@redux/auth/auth.actions'
import { selectConfig } from '@redux/config/config.selectors'
import { WorkerActions } from '@redux/worker/worker.actions'
import { selectWorkerTask } from '@redux/worker/worker.selectors'
import { ONE, ZERO } from '@shared//constants'
import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'
import {
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs'

const PROGRESS_INITIAL_VALUE = 100
const ONE_SECOND = 1000

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
})
export class WorkerComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>()

  constructor(private _store: Store<AppState>) {
    this._store.dispatch(WorkerActions.loadTask())
  }

  progressValue = PROGRESS_INITIAL_VALUE
  intervalId: number | undefined

  ngOnInit(): void {
    this._store
      .select(selectConfig)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(config => {
        if (config?.workerAutoTimeout) {
          if (config.workerAutoTimeout > ZERO) {
            this.progressValue = PROGRESS_INITIAL_VALUE
            this.startProgressBar(config.workerAutoTimeout)
          } else {
            this.progressValue = ZERO
          }
        }
      })

    this.currentTask$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      this._store
        .select(selectConfig)
        .pipe(take(ONE))
        .subscribe(this._checkAndRestartTimer)
    })
  }

  private _checkAndRestartTimer(config: AppConfigurationResponse | undefined) {
    if (config?.workerAutoTimeout && config.workerAutoTimeout > ZERO) {
      this.resetAndRestartTimer(config.workerAutoTimeout)
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()

    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  startProgressBar(timeout: number): void {
    const decrement = PROGRESS_INITIAL_VALUE / timeout
    this.updateProgressBar(decrement)
  }

  updateProgressBar(decrement: number): void {
    this.progressValue -= decrement
    if (this.progressValue <= ZERO) {
      this._store.dispatch(AuthActions.logout())
    } else {
      this.intervalId = window.setTimeout(
        () => this.updateProgressBar(decrement),
        ONE_SECOND,
      )
    }
  }

  resetAndRestartTimer(timeout: number): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
    }
    this.progressValue = PROGRESS_INITIAL_VALUE
    this.startProgressBar(timeout)
  }

  currentTask$ = this._store
    .select(selectWorkerTask)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  workerAutoTimeout$ = this._store.select(selectConfig).pipe(
    map(config => config !== undefined && config.workerAutoTimeout > ZERO),
    shareReplay({ bufferSize: ONE, refCount: true }),
    distinctUntilChanged(),
  )

  logout(): void {
    this._store.dispatch(AuthActions.logout())
  }
}

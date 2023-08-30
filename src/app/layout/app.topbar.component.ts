import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { MenuItem } from 'primeng/api'
import { distinctUntilChanged, shareReplay, Subject, takeUntil } from 'rxjs'

import { AppState } from '../redux/app.state'
import { AuthActions } from '../redux/auth/auth.actions'
import { ConfigActions } from '../redux/config/config.actions'
import {
  selectConfig,
  selectConfigLoading,
} from '../redux/config/config.selectors'
import { ONE, ZERO } from '../shared/constants'
import { LayoutService } from './service/app.layout.service'

const ONE_MINUTE = 60
const FIVE_MINUTES = 300

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnDestroy {
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  configForm!: FormGroup

  config$ = this._store
    .select(selectConfig)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  configLoading$ = this._store.select(selectConfigLoading)

  workerAutoTimeoutOptions = [
    { label: 'Desactivado', value: ZERO },
    { label: '1 minuto', value: ONE_MINUTE },
    { label: '5 minutos', value: FIVE_MINUTES },
  ]

  private _unsubscribe$ = new Subject<void>()

  constructor(
    public layoutService: LayoutService,
    private _store: Store<AppState>,
    private _fb: FormBuilder,
  ) {
    this.config$.pipe(takeUntil(this._unsubscribe$)).subscribe(config => {
      if (config) {
        this.configForm = this._fb.group({
          registerEnabled: [config.registerEnabled],
          workerAutoTimeout: [config.workerAutoTimeout],
        })

        this.configForm.valueChanges
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(value => {
            this._store.dispatch(ConfigActions.updateConfig({ payload: value }))
          })
      }
    })
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  onLogOut() {
    this._store.dispatch(AuthActions.logout())
  }
}

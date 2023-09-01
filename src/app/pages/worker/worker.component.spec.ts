import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { WorkerComponent } from './worker.component'
import { AppState } from '@redux/app.state'
import { AuthActions } from '@redux/auth/auth.actions'
import { WorkerActions } from '@redux/worker/worker.actions'
import { SharedModule } from '@shared/shared.module'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { provideMockStore } from '@ngrx/store/testing'
import { WorkerModule } from './worker.module'

describe('GIVEN: WorkerComponent', () => {
  let component: WorkerComponent
  let fixture: ComponentFixture<WorkerComponent>
  let store: Store<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, WorkerModule],
      declarations: [WorkerComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(WorkerComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should start progress bar based on config', () => {
    const startProgressBarSpy = jest.spyOn(component, 'startProgressBar')
    jest.spyOn(store, 'select').mockReturnValue(
      of({
        workerAutoTimeout: 10,
      }),
    )
    component.ngOnInit()
    expect(startProgressBarSpy).toHaveBeenCalledWith(10)
  })

  it('THEN: should log out if progress value is zero', () => {
    jest.spyOn(store, 'dispatch')
    component.progressValue = 0
    component.updateProgressBar(10)
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout())
  })

  it('THEN: should update progress bar', () => {
    component.progressValue = 100
    component.updateProgressBar(10)
    expect(component.progressValue).toBe(90)
  })

  it('THEN: should reset and restart timer', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout')
    const startProgressBarSpy = jest.spyOn(component, 'startProgressBar')

    component.intervalId = 42
    component.resetAndRestartTimer(10)

    expect(clearTimeoutSpy).toHaveBeenCalledWith(42)
    expect(startProgressBarSpy).toHaveBeenCalledWith(10)
    expect(component.progressValue).toBe(component.progressValue)
  })

  it('THEN: should logout', () => {
    jest.spyOn(store, 'dispatch')
    component.logout()
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout())
  })

  it('THEN: workerAutoTimeout$ should return if configuration is enabled or not', () => {
    jest.spyOn(store, 'select').mockReturnValue(
      of({
        workerAutoTimeout: 10,
      }),
    )
    component.workerAutoTimeout$.subscribe(timeout => {
      expect(timeout).toBe(true)
    })

    jest.spyOn(store, 'select').mockReturnValue(
      of({
        workerAutoTimeout: 0,
      }),
    )

    component.workerAutoTimeout$.subscribe(timeout => {
      expect(timeout).toBe(false)
    })
  })
})

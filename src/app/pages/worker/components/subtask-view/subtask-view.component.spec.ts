import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { SubtaskViewComponent } from './subtask-view.component'
import { AppState } from '@redux/app.state'
import { WorkerActions } from '@redux/worker/worker.actions'
import { provideMockStore } from '@ngrx/store/testing'
import { WorkerTaskSubtask } from '@shared/models/worker-task-response'
import { SharedModule } from 'primeng/api'
import { WorkerModule } from '@pages/worker/worker.module'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'

describe('GIVEN: SubtaskViewComponent', () => {
  let component: SubtaskViewComponent
  let fixture: ComponentFixture<SubtaskViewComponent>
  let store: Store<AppState>

  const initialSubtask: WorkerTaskSubtask = {
    id: 123,
    order: 0,
    status: 'pending',
    product: {
      id: 1,
      name: 'Product 1',
    },
    subtaskEvents: [
      { id: 1, quantityCompleted: 2, timestamp: new Date() },
      { id: 2, quantityCompleted: 1, timestamp: new Date() },
    ],
    quantity: 5,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, WorkerModule],
      declarations: [SubtaskViewComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(SubtaskViewComponent)
    component = fixture.componentInstance
    component.subtask = initialSubtask
    store = TestBed.inject(Store)
    fixture.detectChanges()
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should calculate remaining items', () => {
    expect(component.calculateRemainingItems()).toBe(2)
  })

  it('THEN: should validate if partial value is greater than remaining', () => {
    component.partialCompleteValue.setValue('3')
    expect(component.partialSuperiorToRemaining()).toBe(true)
  })

  it('THEN: should show correct message if partial value is greater than remaining', () => {
    component.partialCompleteValue.setValue('3')
    expect(component.partialSuperiorToRemainingMessage()).toBe(
      'La cantidad introducida es superior a la cantidad restante (2), se completará la subtarea con la cantidad restante.',
    )
  })

  it('THEN: should dispatch action for partial completion', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    component.partialCompleteValue.setValue('1')
    component.submit(true)
    expect(dispatchSpy).toHaveBeenCalledWith(
      WorkerActions.completeTask({
        payload: {
          id: 123,
          quantityCompleted: 1,
        },
      }),
    )
  })

  it('THEN: should not dispatch action if form control is invalid', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    component.partialCompleteValue.setValue(null)
    component.submit(true)
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  it('THEN: should dispatch action for complete all', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    component.submit(false)
    expect(dispatchSpy).toHaveBeenCalledWith(
      WorkerActions.completeTask({
        payload: {
          id: 123,
          quantityCompleted: 2,
        },
      }),
    )
  })
})

import { Action } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'
import { ReplaySubject, of, throwError } from 'rxjs'
import { WorkerEffects } from './worker.effects'
import { MessageService } from 'primeng/api'
import { WorkerService } from '@integration/worker/worker.service'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'
import {
  ACTIVE_WORKERS_RESPONSE_MOCK,
  WORKER_TASK_RESPONSE_MOCK,
} from '@mocks/worker.mock'
import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { TestBed } from '@angular/core/testing'
import { WorkerActions } from './worker.actions'

describe('GIVEN: WorkerEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: WorkerEffects
  let workerService: WorkerService
  let messageService: MessageService

  const workerTaskResponseMock: WorkerTaskResponse = WORKER_TASK_RESPONSE_MOCK
  const activeWorkersResponseMock: ActiveWorkersResponse =
    ACTIVE_WORKERS_RESPONSE_MOCK

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkerEffects,
        provideMockActions(() => actions),
        {
          provide: WorkerService,
          useValue: {
            getTask: jest.fn().mockReturnValue(of(workerTaskResponseMock)),
            getActiveWorkers: jest
              .fn()
              .mockReturnValue(of(activeWorkersResponseMock)),
            completeTask: jest.fn().mockReturnValue(of({} as any)),
          },
        },
        {
          provide: MessageService,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    })

    effects = TestBed.inject(WorkerEffects)
    workerService = TestBed.inject(WorkerService)
    messageService = TestBed.inject(MessageService)
  })

  describe('WHEN loadTask$', () => {
    it('THEN: should return a loadWorkerTaskSuccess action', () => {
      const action = WorkerActions.loadTask()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.loadTask$.subscribe(result => {
        expect(result).toEqual(
          WorkerActions.loadTaskSuccess({
            payload: workerTaskResponseMock,
          }),
        )
      })
    })

    it('THEN: should return a loadTaskFailure action', () => {
      const action = WorkerActions.loadTask()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(workerService, 'getTask')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.loadTask$.subscribe(result => {
        expect(result).toEqual(
          WorkerActions.loadTaskFailure({
            error: 'error',
          }),
        )
      })
    })
  })

  describe('WHEN loadActiveWorkers$', () => {
    it('THEN: should return a loadActiveWorkersSuccess action', () => {
      const action = WorkerActions.loadActiveWorkers()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.loadActiveWorkers$.subscribe(result => {
        expect(result).toEqual(
          WorkerActions.loadActiveWorkersSuccess({
            payload: activeWorkersResponseMock,
          }),
        )
      })
    })

    it('THEN: should return a loadActiveWorkersFail action', () => {
      const action = WorkerActions.loadActiveWorkers()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(workerService, 'getActiveWorkers')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.loadActiveWorkers$.subscribe(result => {
        expect(result).toEqual(
          WorkerActions.loadActiveWorkersFailure({
            error: 'error',
          }),
        )
      })
    })
  })

  describe('WHEN completeTask$', () => {
    it('THEN: should return a completeTaskSuccess action', () => {
      const action = WorkerActions.completeTask({
        payload: workerTaskResponseMock,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest.spyOn(workerService, 'completeTask').mockReturnValue(of({} as any))

      effects.completeTask$.subscribe(result => {
        expect(result).toEqual(WorkerActions.completeTaskSuccess())
      })
    })

    it('THEN: should return a completeTaskFail action', () => {
      const action = WorkerActions.completeTask({
        payload: workerTaskResponseMock,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(workerService, 'completeTask')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.completeTask$.subscribe(result => {
        expect(result).toEqual(
          WorkerActions.completeTaskFailure({
            error: 'error',
          }),
        )
      })
    })
  })

  describe('WHEN completeTaskSuccess$', () => {
    it('THEN: should return a loadTask action', () => {
      const action = WorkerActions.completeTaskSuccess()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.completeTaskSuccess$.subscribe(result => {
        expect(result).toEqual(WorkerActions.loadTask())
      })
    })
  })
})

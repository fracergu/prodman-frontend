import { Action } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'
import { ReplaySubject, of, throwError } from 'rxjs'
import { TasksEffects } from './tasks.effects'
import { TasksService } from '@integration/tasks/tasks.service'
import { MessageService } from 'primeng/api'
import { TestBed } from '@angular/core/testing'
import { TASK_RESPONSE_MOCK } from '@mocks/task.mock'
import { TasksActions } from './tasks.actions'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { TaskResponse } from '@shared/models/task-response.model'
import { TasksSearchParameters } from '@shared/models/task-request.model'

describe('GIVEN: TasksEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: TasksEffects
  let tasksService: TasksService
  let messageService: MessageService

  const taskResponseMock: PaginatedResponse<TaskResponse> = {
    data: TASK_RESPONSE_MOCK,
    total: TASK_RESPONSE_MOCK.length,
    prevPage: null,
    nextPage: null,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksEffects,
        provideMockActions(() => actions),
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn().mockReturnValue(of(taskResponseMock)),
            createTask: jest.fn().mockReturnValue(of(TASK_RESPONSE_MOCK[0])),
            updateTask: jest.fn().mockReturnValue(of(TASK_RESPONSE_MOCK[0])),
            deleteTask: jest.fn().mockReturnValue(of(null)),
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

    effects = TestBed.inject(TasksEffects)
    tasksService = TestBed.inject(TasksService)
    messageService = TestBed.inject(MessageService)
  })

  describe('WHEN loadTasks$', () => {
    it('THEN: should return a loadTasksSuccess action', done => {
      const action = TasksActions.loadTasks({
        params: {} as TasksSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.loadTasks$.subscribe(result => {
        expect(result).toEqual(TasksActions.loadTasksSuccess(taskResponseMock))
        done()
      })
    })

    it('THEN: should return a loadTasksFail action', () => {
      const action = TasksActions.loadTasks({
        params: {} as TasksSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(tasksService, 'getTasks')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.loadTasks$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.loadTasksFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN createTask$', () => {
    it('THEN: should return a createTaskSuccess action', () => {
      const action = TasksActions.createTask({
        payload: TASK_RESPONSE_MOCK[0],
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.createTask$.subscribe(result => {
        expect(result).toEqual(TasksActions.createTaskSuccess())
      })
    })

    it('THEN: should return a createTaskFail action', () => {
      const action = TasksActions.createTask({
        payload: TASK_RESPONSE_MOCK[0],
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(tasksService, 'createTask')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.createTask$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.createTaskFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN updateTask$', () => {
    it('THEN: should return a updateTaskSuccess action', () => {
      const action = TasksActions.updateTask({
        payload: TASK_RESPONSE_MOCK[0],
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(tasksService, 'updateTask')
        .mockReturnValue(of(TASK_RESPONSE_MOCK[0]))

      effects.updateTask$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.updateTaskSuccess({
            payload: TASK_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('THEN: should return a updateTaskFail action', () => {
      const action = TasksActions.updateTask({
        payload: TASK_RESPONSE_MOCK[0],
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(tasksService, 'updateTask')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.updateTask$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.updateTaskFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN deleteTask$', () => {
    it('THEN: should return a deleteTaskSuccess action', () => {
      const action = TasksActions.deleteTask({
        id: TASK_RESPONSE_MOCK[0].id,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest.spyOn(tasksService, 'deleteTask').mockReturnValue(of({} as any))

      effects.deleteTask$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.deleteTaskSuccess({
            id: TASK_RESPONSE_MOCK[0].id,
          }),
        )
      })
    })

    it('THEN: should return a deleteTaskFail action', () => {
      const action = TasksActions.deleteTask({
        id: TASK_RESPONSE_MOCK[0].id,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      jest
        .spyOn(tasksService, 'deleteTask')
        .mockReturnValue(throwError(() => new Error('error')))

      effects.deleteTask$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.deleteTaskFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN createTaskSuccess$', () => {
    it('THEN: should return a loadTasks action', () => {
      const action = TasksActions.createTaskSuccess()
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.createTaskSuccess$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.loadTasks({
            params: {} as TasksSearchParameters,
          }),
        )
      })
    })
  })

  describe('WHEN updateTaskSuccess$', () => {
    it('THEN: should return a loadTasks action', () => {
      const action = TasksActions.updateTaskSuccess({
        payload: TASK_RESPONSE_MOCK[0],
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.updateTaskSuccess$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.loadTasks({
            params: {} as TasksSearchParameters,
          }),
        )
      })
    })
  })

  describe('WHEN deleteTaskSuccess$', () => {
    it('THEN: should return a loadTasks action', () => {
      const action = TasksActions.deleteTaskSuccess({
        id: TASK_RESPONSE_MOCK[0].id,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.deleteTaskSuccess$.subscribe(result => {
        expect(result).toEqual(
          TasksActions.loadTasks({
            params: {} as TasksSearchParameters,
          }),
        )
      })
    })
  })
})

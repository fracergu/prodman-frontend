import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import { tasksAdapter } from './tasks.state'
import { TASK_RESPONSE_MOCK } from '@mocks/task.mock'
import * as TasksSelectors from './tasks.selectors'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  tasks: tasksAdapter.getInitialState({
    entities: { [TASK_RESPONSE_MOCK[0].id]: TASK_RESPONSE_MOCK[0] },
    ids: [TASK_RESPONSE_MOCK[0].id],
    nextPage: null,
    prevPage: null,
    total: TASK_RESPONSE_MOCK.length,
    loading: false,
    loaded: true,
    error: undefined,
  }),
}

describe('GIVEN: TasksSelectors', () => {
  describe('WHEN: selectTasksState', () => {
    const result = TasksSelectors.selectTasksState(INITIAL_STATE)
    it('THEN: should return the tasks state', () => {
      expect(result).toEqual(INITIAL_STATE.tasks)
    })
  })

  describe('WHEN: selectTasksError', () => {
    const result = TasksSelectors.selectTasksError(INITIAL_STATE)
    it('THEN: should return the tasks error', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.error)
    })
  })

  describe('WHEN: selectTasks', () => {
    const result = TasksSelectors.selectTasks(INITIAL_STATE)
    it('THEN: should return the tasks', () => {
      expect(result).toEqual([TASK_RESPONSE_MOCK[0]])
    })
  })

  describe('WHEN: selectTasksLoading', () => {
    const result = TasksSelectors.selectTasksLoading(INITIAL_STATE)
    it('THEN: should return the tasks loading', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.loading)
    })
  })

  describe('WHEN: selectTasksLoaded', () => {
    const result = TasksSelectors.selectTasksLoaded(INITIAL_STATE)
    it('THEN: should return the tasks loaded', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.loaded)
    })
  })

  describe('WHEN: selectTasksNextPage', () => {
    const result = TasksSelectors.selectTasksNextPage(INITIAL_STATE)
    it('THEN: should return the tasks next page', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.nextPage)
    })
  })

  describe('WHEN: selectTasksPrevPage', () => {
    const result = TasksSelectors.selectTasksPrevPage(INITIAL_STATE)
    it('THEN: should return the tasks prev page', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.prevPage)
    })
  })

  describe('WHEN: selectTasksTotalItems', () => {
    const result = TasksSelectors.selectTasksTotalItems(INITIAL_STATE)
    it('THEN: should return the tasks total items', () => {
      expect(result).toEqual(INITIAL_STATE.tasks.total)
    })
  })
})

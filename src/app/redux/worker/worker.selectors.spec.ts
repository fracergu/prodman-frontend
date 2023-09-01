import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'

import {
  WORKER_TASK_RESPONSE_MOCK,
  ACTIVE_WORKERS_RESPONSE_MOCK,
} from '@mocks/worker.mock'

import * as WorkerSelectors from './worker.selectors'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  worker: {
    ...initialAppStateMock.worker,
    task: WORKER_TASK_RESPONSE_MOCK,
    activeWorkers: ACTIVE_WORKERS_RESPONSE_MOCK,
  },
}

describe('GIVEN: WorkerSelectors', () => {
  describe('WHEN: selectWorkerState', () => {
    const result = WorkerSelectors.selectWorkerState(INITIAL_STATE)
    it('THEN: should return the worker state', () => {
      expect(result).toEqual(INITIAL_STATE.worker)
    })
  })

  describe('WHEN: selectWorkerTask', () => {
    const result = WorkerSelectors.selectWorkerTask(INITIAL_STATE)
    it('THEN: should return the worker task', () => {
      expect(result).toEqual(INITIAL_STATE.worker.task)
    })
  })

  describe('WHEN: selectActiveWorkers', () => {
    const result = WorkerSelectors.selectActiveWorkers(INITIAL_STATE)
    it('THEN: should return the worker active workers', () => {
      expect(result).toEqual(INITIAL_STATE.worker.activeWorkers)
    })
  })

  describe('WHEN: selectWorkerLoading', () => {
    const result = WorkerSelectors.selectWorkerLoading(INITIAL_STATE)
    it('THEN: should return the worker task loading', () => {
      expect(result).toEqual(INITIAL_STATE.worker.loading)
    })
  })

  describe('WHEN: selectWorkerLoaded', () => {
    const result = WorkerSelectors.selectWorkerLoaded(INITIAL_STATE)
    it('THEN: should return the worker task loaded', () => {
      expect(result).toEqual(INITIAL_STATE.worker.loaded)
    })
  })

  describe('WHEN: selectWorkerError', () => {
    const result = WorkerSelectors.selectWorkerError(INITIAL_STATE)
    it('THEN: should return the worker task error', () => {
      expect(result).toEqual(INITIAL_STATE.worker.error)
    })
  })
})

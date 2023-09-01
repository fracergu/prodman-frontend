import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import * as ConfigSelectors from './config.selectors'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  config: {
    config: {
      registerEnabled: true,
      workerAutoTimeout: 1000,
      workerGetNextSubtask: true,
    },
    loading: false,
    loaded: true,
    error: undefined,
  },
}

describe('GIVEN: ConfigSelectors', () => {
  describe('WHEN: SelectConfigState', () => {
    const result = ConfigSelectors.selectConfigState(INITIAL_STATE)
    it('THEN: should return the config state', () => {
      expect(result).toEqual(INITIAL_STATE.config)
    })
  })

  describe('WHEN: SelectConfig', () => {
    const result = ConfigSelectors.selectConfig(INITIAL_STATE)
    it('THEN: should return the config', () => {
      expect(result).toEqual(INITIAL_STATE.config.config)
    })
  })

  describe('WHEN: SelectConfigLoading', () => {
    const result = ConfigSelectors.selectConfigLoading(INITIAL_STATE)
    it('THEN: should return the config loading', () => {
      expect(result).toEqual(INITIAL_STATE.config.loading)
    })
  })

  describe('WHEN: SelectConfigLoaded', () => {
    const result = ConfigSelectors.selectConfigLoaded(INITIAL_STATE)
    it('THEN: should return the config loaded', () => {
      expect(result).toEqual(INITIAL_STATE.config.loaded)
    })
  })

  describe('WHEN: SelectConfigError', () => {
    const result = ConfigSelectors.selectConfigError(INITIAL_STATE)
    it('THEN: should return the config error', () => {
      expect(result).toEqual(INITIAL_STATE.config.error)
    })
  })
})

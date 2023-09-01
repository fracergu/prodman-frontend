import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'
import { ConfigActions } from './config.actions'
import { configReducer } from './config.reducer'
import { ConfigState, initialConfigState } from './config.state'

describe('GIVEN: ConfigReducer', () => {
  let someInitialState: ConfigState

  const mockConfig: AppConfigurationResponse = {
    registerEnabled: true,
    workerAutoTimeout: 1000,
    workerGetNextSubtask: true,
  }

  beforeEach(() => {
    someInitialState = {
      ...initialConfigState,
    }
  })

  it('should return loading state after loadConfig action', () => {
    const newState = configReducer(someInitialState, ConfigActions.loadConfig())
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and updated config after loadConfigSuccess action', () => {
    const newState = configReducer(
      someInitialState,
      ConfigActions.loadConfigSuccess({ payload: mockConfig }),
    )

    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.config).toEqual(mockConfig)
  })

  it('should return error state after loadConfigFailure action', () => {
    const newState = configReducer(
      someInitialState,
      ConfigActions.loadConfigFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after updateConfig action', () => {
    const newState = configReducer(
      someInitialState,
      ConfigActions.updateConfig({ payload: mockConfig }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and updated config after updateConfigSuccess action', () => {
    const updatedConfig: AppConfigurationResponse = {
      ...mockConfig,
      registerEnabled: false,
    }

    const newState = configReducer(
      someInitialState,
      ConfigActions.updateConfigSuccess({ payload: updatedConfig }),
    )

    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.config).toEqual(updatedConfig)
  })

  it('should return error state after updateConfigFailure action', () => {
    const newState = configReducer(
      someInitialState,
      ConfigActions.updateConfigFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })
})

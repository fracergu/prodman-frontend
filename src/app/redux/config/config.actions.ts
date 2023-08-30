import { createAction, props } from '@ngrx/store'
import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'

export enum ConfigActionType {
  LOAD_CONFIG = '[Config] Load Config',
  LOAD_CONFIG_SUCCESS = '[Config] Load Config Success',
  LOAD_CONFIG_FAILURE = '[Config] Load Config Failure',

  UPDATE_CONFIG = '[Config] Update Config',
  UPDATE_CONFIG_SUCCESS = '[Config] Update Config Success',
  UPDATE_CONFIG_FAILURE = '[Config] Update Config Failure',
}

export const loadConfig = createAction(ConfigActionType.LOAD_CONFIG)

export const loadConfigSuccess = createAction(
  ConfigActionType.LOAD_CONFIG_SUCCESS,
  props<{ payload: AppConfigurationResponse }>(),
)

export const loadConfigFailure = createAction(
  ConfigActionType.LOAD_CONFIG_FAILURE,
  props<{ error: string }>(),
)

export const updateConfig = createAction(
  ConfigActionType.UPDATE_CONFIG,
  props<{ payload: AppConfigurationResponse }>(),
)

export const updateConfigSuccess = createAction(
  ConfigActionType.UPDATE_CONFIG_SUCCESS,
  props<{ payload: AppConfigurationResponse }>(),
)

export const updateConfigFailure = createAction(
  ConfigActionType.UPDATE_CONFIG_FAILURE,
  props<{ error: string }>(),
)

export const ConfigActions = {
  loadConfig,
  loadConfigSuccess,
  loadConfigFailure,
  updateConfig,
  updateConfigSuccess,
  updateConfigFailure,
}

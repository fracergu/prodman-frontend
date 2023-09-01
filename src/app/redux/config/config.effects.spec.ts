import { ReplaySubject, of, throwError } from 'rxjs'
import { ConfigEffects } from './config.effects'
import { ConfigService } from '@integration/config/config.service'
import { MessageService } from 'primeng/api'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { ConfigActions } from './config.actions'

describe('GIVEN: ConfigEffects', () => {
  let actions: ReplaySubject<any>
  let effects: ConfigEffects
  let configService: ConfigService
  let messageService: MessageService

  const configurationMock = {
    registerEnabled: true,
    workerAutoTimeout: 1000,
    workerGetNextSubtask: true,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigEffects,
        provideMockActions(() => actions),
        {
          provide: ConfigService,
          useValue: {
            getConfiguration: () => of(configurationMock),
            updateConfiguration: () => of(configurationMock),
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

    effects = TestBed.inject(ConfigEffects)
    configService = TestBed.inject(ConfigService)
    messageService = TestBed.inject(MessageService)
  })

  describe('loadConfiguration$', () => {
    it('should dispatch getConfigurationSuccess on successful getConfiguration', () => {
      actions = new ReplaySubject(1)
      actions.next(ConfigActions.loadConfig())

      effects.loadConfig$.subscribe(action => {
        expect(action).toEqual(
          ConfigActions.loadConfigSuccess({
            payload: configurationMock,
          }),
        )
      })
    })

    it('should dispatch getConfigurationFailure on failed getConfiguration', () => {
      jest
        .spyOn(configService, 'getConfiguration')
        .mockReturnValue(throwError(() => new Error('error')))
      actions = new ReplaySubject(1)
      actions.next(ConfigActions.loadConfig())

      effects.loadConfig$.subscribe(action => {
        expect(action).toEqual(
          ConfigActions.loadConfigFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('updateConfiguration$', () => {
    it('should dispatch updateConfigurationSuccess on successful updateConfiguration', () => {
      actions = new ReplaySubject(1)
      actions.next(
        ConfigActions.updateConfig({
          payload: configurationMock,
        }),
      )

      effects.updateConfig$.subscribe(action => {
        expect(action).toEqual(
          ConfigActions.updateConfigSuccess({
            payload: configurationMock,
          }),
        )
      })
    })

    it('should dispatch updateConfigurationFailure on failed updateConfiguration', () => {
      jest
        .spyOn(configService, 'updateConfiguration')
        .mockReturnValue(throwError(() => new Error('error')))
      actions = new ReplaySubject(1)
      actions.next(
        ConfigActions.updateConfig({
          payload: configurationMock,
        }),
      )

      effects.updateConfig$.subscribe(action => {
        expect(action).toEqual(
          ConfigActions.updateConfigFailure({ error: 'error' }),
        )
      })
    })
  })
})

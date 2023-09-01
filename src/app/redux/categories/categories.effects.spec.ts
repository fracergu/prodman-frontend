import { EMPTY, ReplaySubject, of, throwError } from 'rxjs'
import { CategoriesEffects } from './categories.effects'
import { CategoriesService } from '@integration/categories/categories.service'
import { MessageService } from 'primeng/api'
import { TestBed } from '@angular/core/testing'
import { CATEGORIES_RESPONSE_MOCK } from '@mocks/categories.mock'
import { provideMockActions } from '@ngrx/effects/testing'
import { CategoriesActions } from './categories.actions'
import { Action } from '@ngrx/store'

describe('GIVEN: CategoriesEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: CategoriesEffects
  let categoriesService: CategoriesService
  let messageService: MessageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriesEffects,
        provideMockActions(() => actions),
        {
          provide: CategoriesService,
          useValue: {
            getCategories: () => of(CATEGORIES_RESPONSE_MOCK),
            createCategory: () => EMPTY,
            updateCategory: () => of(CATEGORIES_RESPONSE_MOCK[0]),
            deleteCategory: () => EMPTY,
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

    effects = TestBed.inject(CategoriesEffects)
    categoriesService = TestBed.inject(CategoriesService)
    messageService = TestBed.inject(MessageService)
  })

  describe('loadCategories$', () => {
    it('should dispatch getCategoriesSuccess on successful getCategories', () => {
      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.loadCategories({ params: { search: undefined } }),
      )

      effects.loadCategories$.subscribe(action => {
        expect(action).toEqual(
          CategoriesActions.loadCategoriesSuccess({
            payload: CATEGORIES_RESPONSE_MOCK,
          }),
        )
      })
    })

    it('should dispatch getCategoriesFailure on failed getCategories', () => {
      jest
        .spyOn(categoriesService, 'getCategories')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.loadCategories({
          params: { search: undefined },
        }),
      )

      effects.loadCategories$.subscribe(action => {
        expect(action).toEqual(
          CategoriesActions.loadCategoriesFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('createCategory$', () => {
    it('should dispatch createCategorySuccess on successful createCategory', () => {
      jest
        .spyOn(categoriesService, 'createCategory')
        .mockReturnValue(of(CATEGORIES_RESPONSE_MOCK[0]))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.createCategory({
          payload: CATEGORIES_RESPONSE_MOCK[0],
        }),
      )

      effects.createCategory$.subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: `Categoría ${CATEGORIES_RESPONSE_MOCK[0].name} creada`,
        })
        expect(action).toEqual(
          CategoriesActions.createCategorySuccess({
            payload: CATEGORIES_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('should dispatch createCategoryFailure on failed createCategory', () => {
      jest
        .spyOn(categoriesService, 'createCategory')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.createCategory({
          payload: CATEGORIES_RESPONSE_MOCK[0],
        }),
      )

      effects.createCategory$.subscribe(action => {
        expect(action).toEqual(
          CategoriesActions.createCategoryFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('updateCategory$', () => {
    it('should dispatch updateCategorySuccess on successful updateCategory', () => {
      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.updateCategory({
          payload: CATEGORIES_RESPONSE_MOCK[0],
        }),
      )

      effects.updateCategory$.subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: `Categoría ${CATEGORIES_RESPONSE_MOCK[0].name} actualizada`,
        })
        expect(action).toEqual(
          CategoriesActions.updateCategorySuccess({
            payload: CATEGORIES_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('should dispatch updateCategoryFailure on failed updateCategory', () => {
      jest
        .spyOn(categoriesService, 'updateCategory')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.updateCategory({
          payload: CATEGORIES_RESPONSE_MOCK[0],
        }),
      )

      effects.updateCategory$.subscribe(action => {
        expect(action).toEqual(
          CategoriesActions.updateCategoryFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('deleteCategory$', () => {
    it('should dispatch deleteCategorySuccess on successful deleteCategory', () => {
      jest
        .spyOn(categoriesService, 'deleteCategory')
        .mockReturnValue(of({} as any))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.deleteCategory({
          id: CATEGORIES_RESPONSE_MOCK[0].id,
        }),
      )

      effects.deleteCategory$.subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: 'Categoría eliminada',
        })
        expect(action).toEqual(
          CategoriesActions.deleteCategorySuccess({
            id: CATEGORIES_RESPONSE_MOCK[0].id,
          }),
        )
      })
    })

    it('should dispatch deleteCategoryFailure on failed deleteCategory', () => {
      jest
        .spyOn(categoriesService, 'deleteCategory')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        CategoriesActions.deleteCategory({
          id: CATEGORIES_RESPONSE_MOCK[0].id,
        }),
      )

      effects.deleteCategory$.subscribe(action => {
        expect(action).toEqual(
          CategoriesActions.deleteCategoryFailure({ error: 'error' }),
        )
      })
    })
  })
})

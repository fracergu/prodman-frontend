import { Action } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'
import { EMPTY, ReplaySubject, of, throwError } from 'rxjs'
import { ProductsEffects } from './products.effects'
import { ProductsService } from '@integration/products/products.service'
import { MessageService } from 'primeng/api'
import { TestBed } from '@angular/core/testing'
import { ProductsActions } from './products.actions'
import { ProductSearchParameters } from '@shared/models/product-request.model'
import {
  PRODUCT_REQUEST_MOCK,
  PRODUCT_RESPONSE_MOCK,
} from '@mocks/product.mock'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductResponse } from '@shared/models/product-response.model'

describe('GIVEN: ProductsEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: ProductsEffects
  let productsService: ProductsService
  let messageService: MessageService

  const productResponseMock: PaginatedResponse<ProductResponse> = {
    data: PRODUCT_RESPONSE_MOCK,
    total: PRODUCT_RESPONSE_MOCK.length,
    prevPage: null,
    nextPage: null,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions),
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of(productResponseMock),
            createProduct: () => EMPTY,
            updateProduct: () => EMPTY,
            deleteProduct: () => EMPTY,
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

    effects = TestBed.inject(ProductsEffects)
    productsService = TestBed.inject(ProductsService)
    messageService = TestBed.inject(MessageService)
  })

  describe('loadProducts$', () => {
    it('should dispatch getProductsSuccess on successful getProducts', () => {
      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.loadProducts({ params: {} as ProductSearchParameters }),
      )

      effects.loadProducts$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.loadProductsSuccess(productResponseMock),
        )
      })
    })

    it('should dispatch getProductsFailure on failed getProducts', () => {
      jest
        .spyOn(productsService, 'getProducts')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.loadProducts({ params: {} as ProductSearchParameters }),
      )

      effects.loadProducts$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.loadProductsFailure({ error: 'Error' }),
        )
      })
    })
  })

  describe('createProduct$', () => {
    it('should dispatch createProductSuccess on successful createProduct', () => {
      jest
        .spyOn(productsService, 'createProduct')
        .mockReturnValue(of({} as any))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.createProduct({
          payload: PRODUCT_REQUEST_MOCK,
        }),
      )

      effects.createProduct$.subscribe(action => {
        expect(action).toEqual(ProductsActions.createProductSuccess())
      })
    })

    it('should dispatch createProductFailure on failed createProduct', () => {
      jest
        .spyOn(productsService, 'createProduct')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.createProduct({
          payload: PRODUCT_REQUEST_MOCK,
        }),
      )

      effects.createProduct$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.createProductFailure({ error: 'Error' }),
        )
      })
    })
  })

  describe('updateProduct$', () => {
    it('should dispatch updateProductSuccess on successful updateProduct', () => {
      jest
        .spyOn(productsService, 'updateProduct')
        .mockReturnValue(of({} as any))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.updateProduct({
          payload: PRODUCT_REQUEST_MOCK,
        }),
      )

      effects.updateProduct$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.updateProductSuccess({
            payload: PRODUCT_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('should dispatch updateProductFailure on failed updateProduct', () => {
      jest
        .spyOn(productsService, 'updateProduct')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.updateProduct({
          payload: PRODUCT_REQUEST_MOCK,
        }),
      )

      effects.updateProduct$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.updateProductFailure({ error: 'Error' }),
        )
      })
    })
  })

  describe('deleteProduct$', () => {
    it('should dispatch deleteProductSuccess on successful deleteProduct', () => {
      jest
        .spyOn(productsService, 'deleteProduct')
        .mockReturnValue(of({} as any))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.deleteProduct({
          id: PRODUCT_RESPONSE_MOCK[0].id,
        }),
      )

      effects.deleteProduct$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.deleteProductSuccess({
            id: PRODUCT_RESPONSE_MOCK[0].id,
          }),
        )
      })
    })

    it('should dispatch deleteProductFailure on failed deleteProduct', () => {
      jest
        .spyOn(productsService, 'deleteProduct')
        .mockReturnValue(throwError(() => new Error('error')))

      actions = new ReplaySubject(1)
      actions.next(
        ProductsActions.deleteProduct({
          id: PRODUCT_RESPONSE_MOCK[0].id,
        }),
      )

      effects.deleteProduct$.subscribe(action => {
        expect(action).toEqual(
          ProductsActions.deleteProductFailure({ error: 'Error' }),
        )
      })
    })
  })
})

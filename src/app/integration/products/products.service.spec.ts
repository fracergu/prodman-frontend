import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import {
  ProductRequest,
  ProductSearchParameters,
} from '@shared/models/product-request.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Api } from '../api'
import { ProductsService } from './products.service'

describe('GIVEN: ProductsService', () => {
  let service: ProductsService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        {
          provide: Api,
          useValue: {
            productsUrl: 'http://localhost/api/products',
          },
        },
      ],
    })

    service = TestBed.inject(ProductsService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getProducts method', () => {
    it('THEN: should execute a GET request with search parameters', () => {
      const params: ProductSearchParameters = { page: 1, limit: 10 }

      service.getProducts(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.productsUrl}` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the createProduct method', () => {
    it('THEN: should execute a POST request with the new product', () => {
      const product: ProductRequest = {
        id: 1,
        name: 'Apple',
        description: 'Fresh Apple',
      }

      service.createProduct(product).subscribe()

      const req = httpMock.expectOne(`${api.productsUrl}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(product)
    })
  })

  describe('WHEN calling the updateProduct method', () => {
    it('THEN: should execute a PUT request with the updated product', () => {
      const product: ProductRequest = {
        id: 1,
        name: 'Updated Apple',
        description: 'Updated Fresh Apple',
      }

      service.updateProduct(product).subscribe()

      const req = httpMock.expectOne(`${api.productsUrl}/${product.id}`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(product)
    })
  })

  describe('WHEN calling the deleteProduct method', () => {
    it('THEN: should execute a DELETE request for the product ID', () => {
      const id = 1

      service.deleteProduct(id).subscribe()

      const req = httpMock.expectOne(`${api.productsUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
    })
  })
})

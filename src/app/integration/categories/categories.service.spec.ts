import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import {
  CategoriesSearchParameters,
  CategoryRequest,
} from '@shared/models/product-request.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Api } from '../api'
import { CategoriesService } from './categories.service'

describe('GIVEN: CategoriesService', () => {
  let service: CategoriesService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        {
          provide: Api,
          useValue: {
            categoriesUrl: 'http://localhost/api/categories',
          },
        },
      ],
    })

    service = TestBed.inject(CategoriesService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getCategories method', () => {
    it('THEN: should execute a GET request with search parameters', () => {
      const params: CategoriesSearchParameters = { search: 'Fruit' }

      service.getCategories(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.categoriesUrl}` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the createCategory method', () => {
    it('THEN: should execute a POST request with the new category', () => {
      const category: CategoryRequest = {
        id: 1,
        name: 'Fruit',
        description: 'Fresh Fruit',
      }

      service.createCategory(category).subscribe()

      const req = httpMock.expectOne(`${api.categoriesUrl}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(category)
    })
  })

  describe('WHEN calling the updateCategory method', () => {
    it('THEN: should execute a PUT request with the updated category', () => {
      const category: CategoryRequest = {
        id: 1,
        name: 'New Fruit',
        description: 'Fresh Fruit',
      }

      service.updateCategory(category).subscribe()

      const req = httpMock.expectOne(`${api.categoriesUrl}/${category.id}`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(category)
    })
  })

  describe('WHEN calling the deleteCategory method', () => {
    it('THEN: should execute a DELETE request for the category ID', () => {
      const id = 1

      service.deleteCategory(id).subscribe()

      const req = httpMock.expectOne(`${api.categoriesUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
    })
  })
})

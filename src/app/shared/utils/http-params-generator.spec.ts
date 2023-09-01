import { HttpParams } from '@angular/common/http'
import { httpParamsGenerator } from './http-params-generator'

describe('GIVEN: HttpParamsGenerator', () => {
  describe('WHEN: calling the httpParamsGenerator method', () => {
    it('THEN: should return a HttpParams object', () => {
      const result = httpParamsGenerator({ test: 'test' })
      expect(result instanceof HttpParams).toBeTruthy()
      expect(result.get('test')).toEqual('test')
    })
  })

  describe('WHEN: calling the httpParamsGenerator method with a null value', () => {
    it('THEN: should return a HttpParams object', () => {
      const result = httpParamsGenerator({ test: null })
      expect(result instanceof HttpParams).toBeTruthy()
      expect(result.get('test')).toBeNull()
    })
  })

  describe('WHEN: calling the httpParamsGenerator method with an undefined value', () => {
    it('THEN: should return a HttpParams object', () => {
      const result = httpParamsGenerator({ test: undefined })
      expect(result instanceof HttpParams).toBeTruthy()
      expect(result.get('test')).toBeNull()
    })
  })
})

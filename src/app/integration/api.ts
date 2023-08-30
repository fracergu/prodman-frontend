import { Injectable } from '@angular/core'

import { IntegrationModule } from './integration.module'

const API_VERSION = 'v1'

@Injectable({
  providedIn: IntegrationModule,
})
export class Api {
  BASE_URL = `/api/${API_VERSION}`

  get authUrl() {
    return `${this.BASE_URL}/auth`
  }

  get usersUrl() {
    return `${this.BASE_URL}/users`
  }

  get productsUrl() {
    return `${this.BASE_URL}/products`
  }

  get categoriesUrl() {
    return `${this.productsUrl}/categories`
  }

  get tasksUrl() {
    return `${this.BASE_URL}/tasks`
  }

  get configUrl() {
    return `${this.BASE_URL}/config`
  }

  get workerUrl() {
    return `${this.BASE_URL}/worker`
  }

  get productionUrl() {
    return `${this.BASE_URL}/production`
  }
}

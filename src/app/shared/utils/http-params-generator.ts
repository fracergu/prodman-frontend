import { HttpParams } from '@angular/common/http'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const httpParamsGenerator = (input: any) => {
  let params = new HttpParams()
  Object.keys(input).forEach(key => {
    if (input[key] !== undefined && input[key] !== null)
      params = params.append(key, input[key])
  })
  return params
}

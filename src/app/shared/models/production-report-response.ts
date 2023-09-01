export interface ProductionReportResponse {
  generalStats: GeneralStats
  byDay: { [key: string]: number }
  byEmployee: { [key: string]: number }
  byProduct: { [key: string]: number }
}

interface GeneralStats {
  totalProduced: number
  totalEmployees: number
  avgProductionPerEmployee: number
  highProductionDays: Array<Array<Date | number>>
  employeeRanking: Array<Array<number | string>>
  employeesList: { [key: string]: EmployeesList }
  productsList: { [key: string]: ProductsList }
}

interface EmployeesList {
  name: string
  lastName?: string
}

interface ProductsList {
  name: string
  reference?: string
}

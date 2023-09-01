import { ProductionReportResponse } from '@shared/models/production-report-response'
import { ProductionResponse } from '@shared/models/production-response'
import { TaskStatus } from '@shared/models/task-response.model'

export const PRODUCTION_RESPONSE_MOCK: ProductionResponse[] = [
  {
    id: 1,
    timestamp: new Date('2023-08-28T13:58:44.563Z'),
    quantityCompleted: 1,
    subtask: {
      id: 5,
      quantity: 2,
      order: 0,
      status: TaskStatus.Completed,
      product: {
        id: 43,
        name: 'Product 35',
      },
      task: {
        id: 1,
        status: TaskStatus.Completed,
        user: {
          id: 5,
          name: 'Ana',
          lastName: 'Alvarez',
        },
      },
    },
  },
  {
    id: 2,
    timestamp: new Date('2023-08-28T13:58:51.006Z'),
    quantityCompleted: 1,
    subtask: {
      id: 5,
      quantity: 2,
      order: 0,
      status: TaskStatus.Completed,
      product: {
        id: 43,
        name: 'Product 35',
        reference: 'REF-00035',
      },
      task: {
        id: 1,
        status: TaskStatus.Completed,
        user: {
          id: 5,
          name: 'Ana',
          lastName: 'Alvarez',
        },
      },
    },
  },
]

export const PRODUCTION_REPORT_RESPONSE_MOCK: ProductionReportResponse = {
  generalStats: {
    totalProduced: 363,
    totalEmployees: 2,
    avgProductionPerEmployee: 181.5,
    highProductionDays: [[new Date('2023-08-28'), 361]],
    employeeRanking: [
      ['5', 352],
      ['8', 11],
    ],
    employeesList: {
      '5': {
        name: 'Ana',
        lastName: 'Alvarez',
      },
      '8': {
        name: 'Maria',
      },
    },
    productsList: {
      '1': {
        name: 'Product 3',
        reference: 'REF-00003123',
      },
      '2': {
        name: 'Product 2',
        reference: 'REF-00002',
      },
      '3': {
        name: 'Product 1',
        reference: 'REF-00001',
      },
      '7': {
        name: 'Product 5',
        reference: 'REF-00005',
      },
      '9': {
        name: 'Product 6',
        reference: 'REF-00006',
      },
      '20': {
        name: 'Product 21',
        reference: 'REF-00021',
      },
      '24': {
        name: 'Product 19',
        reference: 'REF-00019',
      },
      '30': {
        name: 'Product 29',
        reference: 'REF-00029',
      },
      '38': {
        name: 'Product 39',
        reference: 'REF-00039',
      },
      '43': {
        name: 'Product 35',
        reference: 'REF-00035',
      },
      '46': {
        name: 'Product 43',
        reference: 'REF-00043',
      },
      '47': {
        name: 'Product 47',
        reference: 'REF-00047',
      },
      '48': {
        name: 'Product 45',
        reference: 'REF-00045',
      },
      '50': {
        name: 'Product 49',
        reference: 'REF-00049',
      },
    },
  },
  byDay: {
    '2023-08-28': 361,
    '2023-08-29': 2,
  },
  byEmployee: {
    '5': 352,
    '8': 11,
  },
  byProduct: {
    '1': 108,
    '2': 100,
    '3': 100,
    '7': 9,
    '9': 2,
    '20': 1,
    '24': 3,
    '30': 7,
    '38': 7,
    '43': 2,
    '46': 3,
    '47': 3,
    '48': 9,
    '50': 9,
  },
}

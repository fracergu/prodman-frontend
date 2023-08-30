import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { ProductionActions } from '@redux/production/production.actions'
import {
  selectProductionLoading,
  selectProductionOverview,
} from '@redux/production/production.selectors'
import { ONE } from '@shared/constants'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  startDate = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay()),
  )
  endDate = new Date()

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  constructor(private _store: Store<AppState>) {
    this._store.dispatch(
      ProductionActions.loadOverview({
        params: {
          startDate: this.startDate.toISOString(),
          endDate: this.endDate.toISOString(),
        },
      }),
    )
  }

  loading$ = this._store.select(selectProductionLoading).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  productionOverview$ = this._store.select(selectProductionOverview).pipe(
    shareReplay({
      bufferSize: ONE,
      refCount: true,
    }),
    distinctUntilChanged(),
  )

  productsPieChartData$ = this.productionOverview$.pipe(
    map(overview => (overview !== undefined ? overview : null)),
    filter(
      (overview): overview is ProductionReportResponse => overview !== null,
    ),
    map(overview => {
      const byProduct = overview.byProduct
      const productsList = overview.generalStats.productsList

      const labels: string[] = []
      const data: number[] = []

      Object.keys(byProduct).forEach(productId => {
        const productName = productsList[productId]?.name
        if (productName) {
          labels.push(productName)
          data.push(byProduct[productId])
        }
      })

      return {
        labels,
        datasets: [{ data }],
      }
    }),
  )

  workersPieChartData$ = this.productionOverview$.pipe(
    map(overview => (overview !== undefined ? overview : null)),
    filter(
      (overview): overview is ProductionReportResponse => overview !== null,
    ),
    map(overview => {
      const byWorker = overview.byEmployee
      const workersList = overview.generalStats.employeesList

      const labels: string[] = []
      const data: number[] = []

      Object.keys(byWorker).forEach(workerId => {
        const workerName = `${workersList[workerId]?.name} ${
          workersList[workerId]?.lastName ? workersList[workerId]?.lastName : ''
        }}`.trim()
        if (workerName) {
          labels.push(workerName)
          data.push(byWorker[workerId])
        }
      })

      return {
        labels,
        datasets: [{ data }],
      }
    }),
  )

  productionByDayChartData$ = this.productionOverview$.pipe(
    map(overview => (overview !== undefined ? overview : null)),
    filter(
      (overview): overview is ProductionReportResponse => overview !== null,
    ),
    map(overview => {
      const byDay = overview.byDay

      const labels: string[] = []
      const data: number[] = []

      Object.keys(byDay).forEach(day => {
        labels.push(day)
        data.push(byDay[day])
      })

      return {
        labels,
        datasets: [
          {
            label: 'Producción',
            data,
            fill: false,
            borderColor: '#4bc0c0',
          },
        ],
      }
    }),
  )
}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { ProductionListComponent } from './components/production-list/production-list.component'
import { ProductionComponent } from './production.component'
import { ProductionRoutingModule } from './production-routing.module'

@NgModule({
  declarations: [ProductionComponent, ProductionListComponent],
  imports: [CommonModule, ProductionRoutingModule, SharedModule],
})
export class ProductionModule {}

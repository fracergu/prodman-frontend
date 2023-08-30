import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { OverviewComponent } from './overview.component'
import { OverviewRoutingModule } from './overview-routing.module'

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
})
export class OverviewModule {}

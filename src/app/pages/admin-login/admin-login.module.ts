import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { AdminLoginComponent } from './admin-login.component'
import { AdminLoginRoutingModule } from './admin-login-routing.module'

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AdminLoginRoutingModule, SharedModule],
})
export class AdminLoginModule {}

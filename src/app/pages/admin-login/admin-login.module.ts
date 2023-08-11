import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AdminLoginRoutingModule, SharedModule],
})
export class AdminLoginModule {}

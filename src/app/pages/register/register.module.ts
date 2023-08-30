import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'

import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register-routing.module'

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { UserFormComponent } from './components/user-form/user-form.component'
import { UsersListComponent } from './components/users-list/users-list.component'
import { UsersComponent } from './users.component'
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserFormComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}

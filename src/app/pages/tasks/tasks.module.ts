import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'

import { TaskFormComponent } from './components/task-form/task-form.component'
import { TasksListComponent } from './components/tasks-list/tasks-list.component'
import { TasksComponent } from './tasks.component'
import { TasksRoutingModule } from './tasks-routing.module'

@NgModule({
  declarations: [TasksComponent, TasksListComponent, TaskFormComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}

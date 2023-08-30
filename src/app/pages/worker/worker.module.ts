import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { SubtaskViewComponent } from './components/subtask-view/subtask-view.component'
import { TaskViewComponent } from './components/task-view/task-view.component'
import { WorkerComponent } from './worker.component'
import { WorkerRoutingModule } from './worker-routing.module'

@NgModule({
  declarations: [WorkerComponent, TaskViewComponent, SubtaskViewComponent],
  imports: [CommonModule, WorkerRoutingModule, SharedModule],
})
export class WorkerModule {}

import { Component, Input } from '@angular/core'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
})
export class TaskViewComponent {
  @Input() task?: WorkerTaskResponse

  pluralMapping = {
    '=1': 'Subtarea:',
    other: 'Subtareas:',
  }
}

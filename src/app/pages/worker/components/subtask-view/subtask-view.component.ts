import { Component, Input } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { WorkerActions } from '@redux/worker/worker.actions'
import { ZERO } from '@shared//constants'
import { WorkerTaskSubtask } from '@shared/models/worker-task-response'

@Component({
  selector: 'app-subtask-view',
  templateUrl: './subtask-view.component.html',
  styles: [
    `
      .pin-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
      }

      .pin-button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pin-button button {
        display: flex;
        width: 65px;
        height: 65px;
        font-size: 36px;
        vertical-align: middle;
        justify-content: center;
      }
    `,
  ],
})
export class SubtaskViewComponent {
  @Input() subtask!: WorkerTaskSubtask

  constructor(private _store: Store<AppState>) {}

  calculateRemainingItems(): number {
    const itemsCompleted = this.subtask.subtaskEvents.reduce(
      (total, event) => total + event.quantityCompleted,
      ZERO,
    )
    return this.subtask.quantity - itemsCompleted
  }

  displayCompleteAllDialog = false
  displayCompletePartialDialog = false

  partialCompleteValue = new FormControl('', Validators.required)

  partialSuperiorToRemaining(): boolean {
    if (this.partialCompleteValue.value === null) return false
    return (
      parseInt(this.partialCompleteValue.value) > this.calculateRemainingItems()
    )
  }

  partialSuperiorToRemainingMessage(): string {
    return `La cantidad introducida es superior a la cantidad restante (${this.calculateRemainingItems()}), se completará la subtarea con la cantidad restante.`
  }

  submit(partial: boolean): void {
    if (partial) {
      if (this.partialCompleteValue.invalid) return
      this.displayCompletePartialDialog = false
      const quantityCompleted = parseInt(this.partialCompleteValue.value || '0')
      this._store.dispatch(
        WorkerActions.completeTask({
          payload: {
            id: this.subtask.id,
            quantityCompleted,
          },
        }),
      )
    } else {
      this.displayCompleteAllDialog = false
      this._store.dispatch(
        WorkerActions.completeTask({
          payload: {
            id: this.subtask.id,
            quantityCompleted: this.calculateRemainingItems(),
          },
        }),
      )
    }
  }
}

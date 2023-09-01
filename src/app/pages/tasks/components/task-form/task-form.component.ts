import { CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { ONE } from '@shared//constants'
import { ProductResponse } from '@shared/models/product-response.model'
import { TaskRequest } from '@shared/models/task-request.model'
import {
  Subtask,
  TaskResponse,
  TaskStatus,
} from '@shared/models/task-response.model'
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs'

const DRAG_POINTER_DIRECTION_CHANGE_THRESHOLD = 5
const DRAG_START_THRESHOLD = 0
const DRAG_Z_INDEX = 1100

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  providers: [
    {
      provide: CDK_DRAG_CONFIG,
      useValue: {
        dragStartThreshold: DRAG_START_THRESHOLD,
        pointerDirectionChangeThreshold:
          DRAG_POINTER_DIRECTION_CHANGE_THRESHOLD,
        zIndex: DRAG_Z_INDEX,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() task?: TaskResponse
  @Input() isEdit = false
  @Output() submitEvent = new EventEmitter<TaskRequest>()

  taskForm!: FormGroup

  subtasks$ = new BehaviorSubject<Partial<Subtask>[]>([])

  private addSubtask(subtask: Partial<Subtask>) {
    this.subtasks$.next([...this.subtasks$.value, subtask])
  }

  private removeSubtask(subtask: Partial<Subtask>) {
    this.subtasks$.next(this.subtasks$.value.filter(s => s !== subtask))
  }

  removeSubtaskFromView(subtask: Partial<Subtask>) {
    this.removeSubtask(subtask)
    const currentProducts = this.taskForm.get('subtasksProducts')?.value || []
    const updatedProducts = currentProducts.filter(
      (p: ProductResponse) => p.id !== subtask.product?.id,
    )
    this.taskForm.get('subtasksProducts')?.setValue(updatedProducts)
  }

  private _unsubscribe$ = new Subject<void>()

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this._initializeFormGroup()
    this._syncFormWithSubtasks()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  private _initializeFormGroup() {
    this.taskForm = this._fb.group({
      user: [this.task?.user || null],
      subtasksProducts: [this.task?.subtasks.map(s => s.product) || []],
      notes: [this.task?.notes || ''],
      status: [this.task?.status || TaskStatus.Pending],
    })

    const subtasks = this._mapSubtasksToPlainObjects()
    this.subtasks$.next(subtasks)
  }

  private _mapSubtasksToPlainObjects(): Partial<Subtask>[] {
    if (!this.task?.subtasks) return []
    return this.task.subtasks.map(subtask => ({
      quantity: subtask.quantity,
      product: subtask.product,
    }))
  }

  private _syncFormWithSubtasks(): void {
    this.taskForm
      .get('subtasksProducts')
      ?.valueChanges.pipe(
        takeUntil(this._unsubscribe$),
        map((selectedProducts: ProductResponse[]) =>
          this._updateSubtasks(selectedProducts),
        ),
      )
      .subscribe()
  }

  private _updateSubtasks(selectedProducts: ProductResponse[]): void {
    const currentSubtasks = this.subtasks$.value

    selectedProducts.forEach(product => {
      if (!currentSubtasks.some(st => st.product?.id === product.id)) {
        this.addSubtask({ quantity: ONE, product })
      }
    })

    currentSubtasks.forEach(subtask => {
      if (
        !selectedProducts.some(product => product.id === subtask.product?.id)
      ) {
        this.removeSubtask(subtask)
      }
    })
  }

  get subtasksArray(): FormArray {
    return this.taskForm.get('subtasks') as FormArray
  }

  updateQuantity(subtask: Partial<Subtask>, event: Event) {
    const target = event.target as HTMLInputElement
    const value = parseInt(target.value)
    subtask.quantity = isNaN(value) ? ONE : value
    this.subtasks$.next([...this.subtasks$.value])
  }

  onSubmitForm() {
    if (this.taskForm.invalid) return
    const { notes, user } = this.taskForm.value

    const outputTask: TaskRequest = {
      id: this.task?.id,
      notes: notes,
      status: TaskStatus.Pending,
      userId: user?.id,
      subtasks: this.subtasks$.value.map(subtask => ({
        quantity: subtask.quantity,
        productId: subtask.product?.id,
        status: TaskStatus.Pending,
      })),
    }

    this.submitEvent.emit(outputTask)
  }
}

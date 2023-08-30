import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Category } from '@shared/models/product-response.model'
import { ConfirmationService } from 'primeng/api'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  providers: [ConfirmationService],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @Input() category?: Category
  @Input() isEdit = false
  @Output() submitEvent = new EventEmitter<Category>()
  @Output() deleteEvent = new EventEmitter<number>()

  categoryForm!: FormGroup

  private _unsubscribe$ = new Subject<void>()

  constructor(
    private _fb: FormBuilder,
    private _cs: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this._initializeFormGroup()
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  submit(): void {
    if (this.categoryForm.invalid) {
      return
    }
    const category: Category = {
      id: this.category?.id || undefined,
      ...this.categoryForm.value,
      description: this.categoryForm.value.description || null,
    }

    this.submitEvent.emit(category)

    if (!this.isEdit) {
      this.categoryForm.reset()
    }
  }

  delete(): void {
    this.deleteEvent.emit(this.category?.id)
  }

  confirm(event: Event) {
    this._cs.confirm({
      target: event.target as EventTarget,
      message: 'Los productos asociados dejarán de estarlo. ¿Continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete()
      },
    })
  }

  private _initializeFormGroup(): void {
    this.categoryForm = this._fb.group({
      name: [this.category?.name || '', Validators.required],
      description: [this.category?.description || '', []],
    })
  }
}

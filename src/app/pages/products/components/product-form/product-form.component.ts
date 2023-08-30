import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '@redux/app.state'
import { selectCategories } from '@redux/categories/categories.selectors'
import { ONE } from '@shared//constants'
import { ProductRequest } from '@shared/models/product-request.model'
import {
  Category,
  Component as PComponent,
  ProductResponse,
} from '@shared/models/product-response.model'
import { MultiSelect } from 'primeng/multiselect'
import {
  BehaviorSubject,
  distinctUntilChanged,
  shareReplay,
  Subject,
  takeUntil,
} from 'rxjs'

export type SimplifiedProductComponent = {
  quantity: number
  product: Partial<ProductResponse>
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() product?: ProductResponse
  @Input() isEdit = false
  @Output() submitEvent = new EventEmitter<ProductRequest>()

  @ViewChild('msComponents') msComponents!: MultiSelect

  productForm!: FormGroup

  productComponents$ = new BehaviorSubject<SimplifiedProductComponent[]>([])

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
  ) {}

  private _unsubscribe$ = new Subject<void>()

  decimalRegex = /^\d+(\.\d{1,2})?$/

  categories$ = this._store
    .select(selectCategories)
    .pipe(
      shareReplay({ bufferSize: ONE, refCount: true }),
      distinctUntilChanged(),
    )

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
  ngOnInit(): void {
    this._initializeFormGroup()

    this.productForm.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(this._syncFormWithProductComponents.bind(this))
  }

  _syncFormWithProductComponents(formValue: any): void {
    const components: Partial<ProductResponse>[] = formValue.components || []
    const currentComponents = this.productComponents$.value

    const newComponents: SimplifiedProductComponent[] = components
      .filter(c => !currentComponents.some(pc => pc.product.id === c.id))
      .map(c => ({ quantity: ONE, product: c }))

    const filteredComponents = currentComponents.filter(pc =>
      components.some(c => c.id === pc.product.id),
    )

    this.productComponents$.next([...filteredComponents, ...newComponents])
  }

  submit(): void {
    if (this.productForm.valid) {
      const components = this.productComponents$.value.map(c => ({
        quantity: c.quantity,
        productId: c.product.id,
      }))

      const categories = this.productForm.value.categories.map(
        (c: Category) => c.id,
      )

      const productRequest: ProductRequest = {
        id: this.product?.id,
        ...this.productForm.value,
        categories,
        components,
      }

      this.submitEvent.emit({
        ...productRequest,
      })
    }
    if (!this.isEdit) {
      this.productForm.reset()
    }
  }

  private _initializeFormGroup(): void {
    this.productForm = this._fb.group({
      name: [this.product?.name || '', Validators.required],
      price: [this.product?.price || '', Validators.required],
      description: [this.product?.description || ''],
      reference: [this.product?.reference || '', Validators.required],
      categories: [this.product?.categories || []],
      components: [this._parseComponents(this.product?.components) || []],
      active: [this.product?.active || true],
    })
  }

  updateComponentQuantity(event: Event, component: SimplifiedProductComponent) {
    //TODO: Dejar esto similar al form de tasks

    const target = event.target as HTMLInputElement
    const value = parseInt(target.value)

    if (isNaN(value)) {
      return
    }

    const foundComponent = this.productComponents$.value.find(
      c => c.product.id === component.product.id,
    )
    if (foundComponent) {
      foundComponent.quantity = value
    }
  }

  private _productComponentToView(
    component: PComponent,
  ): SimplifiedProductComponent {
    return {
      quantity: component.quantity,
      product: {
        id: component.product.id,
        name: component.product.name,
        reference: component.product.reference,
      },
    }
  }

  private _parseComponents(components?: PComponent[]) {
    if (!components) return []
    const viewComponents = components.map(c => this._productComponentToView(c))
    this.productComponents$.next(viewComponents)
    const cleanComponents = viewComponents.map(c => c.product)
    return cleanComponents
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { ProductFormComponent } from './product-form.component'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AppState } from '@redux/app.state'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { SharedModule } from 'primeng/api'
import { ProductsModule } from '@pages/products/products.module'
import { IntegrationModule } from '@integration/integration.module'

describe('ProductFormComponent', () => {
  let component: ProductFormComponent
  let fixture: ComponentFixture<ProductFormComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [SharedModule, ProductsModule, IntegrationModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    store = TestBed.inject(MockStore)

    fixture = TestBed.createComponent(ProductFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group', () => {
    component.ngOnInit()
    expect(component.productForm).toBeDefined()
  })

  it('should emit submitEvent when form is valid and submit is called', () => {
    const spy = jest.spyOn(component.submitEvent, 'emit')
    component.productForm.patchValue({
      name: 'ProductName',
      price: '10.5',
      reference: 'REF-123',
    })

    component.submit()

    expect(spy).toHaveBeenCalledWith({
      active: true,
      categories: [],
      components: [],
      description: '',
      id: undefined,
      name: 'ProductName',
      price: '10.5',
      reference: 'REF-123',
    })
  })
})

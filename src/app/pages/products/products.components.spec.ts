import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { ProductsComponent } from './products.component'
import { ProductsModule } from './products.module'

describe('GIVEN: ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>
  let component: ProductsComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [ProductsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductsComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })
})

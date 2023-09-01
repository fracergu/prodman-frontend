import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { ProductionComponent } from './production.component'
import { ProductionModule } from './production.module'

describe('GIVEN: ProductionComponent', () => {
  let fixture: ComponentFixture<ProductionComponent>
  let component: ProductionComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionComponent],
      imports: [ProductionModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductionComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TasksComponent } from './tasks.component'
import { TasksModule } from './tasks.module'
import { provideMockStore } from '@ngrx/store/testing'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'

describe('GIVEN: TasksComponent', () => {
  let fixture: ComponentFixture<TasksComponent>
  let component: TasksComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [TasksModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(TasksComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { AppState } from '@redux/app.state'
import { TasksActions } from '@redux/tasks/tasks.actions'
import { TaskRequest } from '@shared/models/task-request.model'
import { TasksListComponent } from './tasks-list.component'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'
import { OverlayPanel } from 'primeng/overlaypanel'
import { SharedModule } from '@shared/shared.module'

describe('TasksListComponent', () => {
  let component: TasksListComponent
  let fixture: ComponentFixture<TasksListComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      imports: [SharedModule],
      providers: [FormBuilder, provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(TasksListComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)

    jest.spyOn(store, 'dispatch')
    jest.spyOn(component, 'onPageChange')

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call onPageChange when page is changed', () => {
    component.onPageChange()
    expect(component.onPageChange).toHaveBeenCalled()
  })

  it('should dispatch createTask when task is created', () => {
    const overlayPanel = { hide() {} } as OverlayPanel
    const task: TaskRequest = {
      notes: 'Some Notes',
      status: 'pending',
      subtasks: [],
      userId: 1,
    }
    component.onCreateTask(task, overlayPanel)
    const action = TasksActions.createTask({ payload: task })
    expect(store.dispatch).toHaveBeenCalledWith(action)
  })
})

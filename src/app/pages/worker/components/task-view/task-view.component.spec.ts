import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TaskViewComponent } from './task-view.component'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'
import { WORKER_TASK_RESPONSE_MOCK } from '@mocks/worker.mock'
import { WorkerModule } from '@pages/worker/worker.module'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { initialAppStateMock as initialState } from '@redux/app.state.mock'

describe('GIVEN: TaskViewComponent', () => {
  let component: TaskViewComponent
  let fixture: ComponentFixture<TaskViewComponent>

  const initialTask: WorkerTaskResponse = WORKER_TASK_RESPONSE_MOCK

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskViewComponent],
      imports: [WorkerModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskViewComponent)
    component = fixture.componentInstance
    component.task = initialTask
    fixture.detectChanges()
  })

  it('THEN: should create', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should display the task id when a task exists', () => {
    const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement
    expect(h2Element.textContent).toContain(`Tarea actual: #${initialTask.id}`)
  })

  it('THEN: should display task notes when they exist', () => {
    const notesElement = fixture.debugElement.query(
      By.css('#notes'),
    ).nativeElement
    expect(notesElement.textContent.trim()).toBe(initialTask.notes)
  })

  it('THEN: should display the pluralized subtask label', () => {
    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement
    expect(h3Element.textContent).toBe(`Subtarea:`)
  })

  it('THEN: should display "No hay tareas asignadas" when task is null', () => {
    component.task = undefined
    fixture.detectChanges()
    const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement
    expect(h2Element.textContent).toBe('No hay tareas asignadas')
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, Validators } from '@angular/forms'
import { TaskFormComponent } from './task-form.component'
import { TaskRequest } from '@shared/models/task-request.model'
import { TaskResponse, TaskStatus } from '@shared/models/task-response.model'
import { SharedModule } from '@shared/shared.module'
import { TasksModule } from '@pages/tasks/tasks.module'
import { IntegrationModule } from '@integration/integration.module'

describe('TaskFormComponent', () => {
  let component: TaskFormComponent
  let fixture: ComponentFixture<TaskFormComponent>
  let formBuilder: FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [SharedModule, TasksModule, IntegrationModule],
      providers: [FormBuilder],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskFormComponent)
    component = fixture.componentInstance
    formBuilder = TestBed.inject(FormBuilder)
    component.taskForm = formBuilder.group({})
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form with default values when no task is provided', () => {
    component.ngOnInit()
    expect(component.taskForm.get('notes')?.value).toBe('')
    expect(component.taskForm.get('status')?.value).toBe(TaskStatus.Pending)
  })

  it('should initialize form with task values when task is provided', () => {
    component.task = {
      id: 1,
      notes: 'Some Notes',
      status: TaskStatus.Completed,
      subtasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      percentageCompleted: 0,
      user: {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        role: 'admin',
        active: true,
      },
    } as TaskResponse
    component.ngOnInit()
    expect(component.taskForm.get('notes')?.value).toBe('Some Notes')
    expect(component.taskForm.get('status')?.value).toBe(TaskStatus.Completed)
  })

  it('should emit submitEvent when form is valid and onSubmitForm is called', () => {
    jest.spyOn(component.submitEvent, 'emit')
    component.taskForm = formBuilder.group({
      notes: ['Some Notes'],
      user: [null],
      status: [TaskStatus.Pending],
    })

    const outputTask: TaskRequest = {
      notes: 'Some Notes',
      status: TaskStatus.Pending,
      userId: undefined,
      subtasks: [],
    }

    component.onSubmitForm()
    expect(component.submitEvent.emit).toHaveBeenCalledWith(outputTask)
  })

  it('should NOT emit submitEvent when form is invalid', () => {
    jest.spyOn(component.submitEvent, 'emit')
    component.taskForm = formBuilder.group({
      notes: [''],
      user: [null, Validators.required],
      status: [''],
    })

    component.onSubmitForm()
    expect(component.submitEvent.emit).not.toHaveBeenCalled()
  })
})

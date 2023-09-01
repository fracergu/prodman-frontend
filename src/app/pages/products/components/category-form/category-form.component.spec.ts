import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { CategoryFormComponent } from './category-form.component'
import { ConfirmationService } from 'primeng/api'
import { SharedModule } from '@shared/shared.module'

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent
  let fixture: ComponentFixture<CategoryFormComponent>
  let confirmationService: ConfirmationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFormComponent],
      imports: [SharedModule],
      providers: [
        FormBuilder,
        {
          provide: ConfirmationService,
          useValue: {
            confirm: jest.fn(),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CategoryFormComponent)
    confirmationService = TestBed.inject(ConfirmationService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group', () => {
    component.ngOnInit()
    expect(component.categoryForm).toBeDefined()
  })

  it('should emit submitEvent when form is valid and submit is called', () => {
    const spy = jest.spyOn(component.submitEvent, 'emit')
    component.categoryForm.patchValue({
      name: 'CategoryName',
      description: 'Some description',
    })

    component.submit()

    expect(spy).toHaveBeenCalledWith({
      id: undefined,
      name: 'CategoryName',
      description: 'Some description',
    })
  })

  it('should emit deleteEvent when delete is called', () => {
    const spy = jest.spyOn(component.deleteEvent, 'emit')
    component.category = {
      id: 1,
      name: 'CategoryName',
      description: 'Some description',
    }

    component.delete()

    expect(spy).toHaveBeenCalledWith(1)
  })
})

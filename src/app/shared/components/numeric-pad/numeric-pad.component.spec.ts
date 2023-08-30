import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NumericPadComponent } from './numeric-pad.component'
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

describe('GIVEN: NumericPadComponent', () => {
  let fixture: ComponentFixture<NumericPadComponent>
  let component: NumericPadComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NumericPadComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: NumericPadComponent,
          multi: true,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NumericPadComponent)
    component = fixture.componentInstance
  })

  it('THEN: should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('THEN: should initialize with a null value', () => {
    expect(component.value).toBeNull()
  })

  it('THEN: should change the value when onPinClick is called', () => {
    component.onPinClick(1)
    expect(component.value).toEqual('1')
  })

  it('THEN: should delete the value when onDeleteClick is called', () => {
    component.value = '12'
    component.onDeleteClick()
    expect(component.value).toEqual('1')
  })

  it('THEN: should set the value to null when onDeleteClick is called and value length is 1', () => {
    component.value = '1'
    component.onDeleteClick()
    expect(component.value).toBeNull()
  })

  it('THEN: should do nothing when onDeleteClick is called and value is null', () => {
    jest.spyOn(component, 'onChange')
    jest.spyOn(component, 'onTouch')
    component.value = null
    component.onDeleteClick()
    expect(component.onChange).not.toHaveBeenCalled()
    expect(component.onTouch).not.toHaveBeenCalled()
    expect(component.value).toBeNull()
  })

  it('THEN: should not change the value when onPinClick is called and maxLength is reached', () => {
    component.maxLength = 2
    component.value = '12'
    component.onPinClick(3)
    expect(component.value).toEqual('12')
  })

  it('THEN: should store the value when writeValue is called', () => {
    component.writeValue('1')
    expect(component.value).toEqual('1')
  })

  it('THEN: should not exceed maxLength when onPinClick is called', () => {
    component.maxLength = 2
    component.value = '12'
    component.onPinClick(3)
    expect(component.value).toEqual('12')
  })

  it('THEN: should disable the component when setDisabledState is called', () => {
    component.setDisabledState(true)
    expect(component.disabled).toEqual(true)
  })

  it('THEN: should register onChange function when registerOnChange is called', () => {
    const fn = jest.fn()
    component.registerOnChange(fn)
    component.onPinClick(1)
    expect(fn).toHaveBeenCalledWith('1')
  })

  it('THEN: should register onTouch function when registerOnTouched is called', () => {
    const fn = jest.fn()
    component.registerOnTouched(fn)
    component.onPinClick(1)
    expect(fn).toHaveBeenCalled()
  })
})

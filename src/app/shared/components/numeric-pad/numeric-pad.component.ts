import { Component, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { ONE, ZERO } from '../../constants'

@Component({
  selector: 'app-numeric-pad',
  templateUrl: './numeric-pad.component.html',
  styles: [
    `
      .numeric-pad-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
      }

      .numeric-pad-button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .numeric-pad-button button {
        display: flex;
        width: 65px;
        height: 65px;
        font-size: 36px;
        vertical-align: middle;
        justify-content: center;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumericPadComponent,
      multi: true,
    },
  ],
})
export class NumericPadComponent implements ControlValueAccessor {
  @Input() maxLength: number | null = null

  disabled = false
  value: string | null = null

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: any = () => {}

  writeValue(val: string): void {
    this.value = val
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onPinClick(number: number): void {
    if (this.value === null) {
      this.value = ''
    }
    if (this.maxLength && this.value.length >= this.maxLength) {
      return
    }
    this.value += number
    this.onChange(this.value)
    this.onTouch()
  }

  onDeleteClick(): void {
    if (this.value === null) return

    if (this.value.length === ONE) {
      this.value = null
    } else {
      const TARGET = -1
      this.value = this.value.slice(ZERO, TARGET)
    }
    this.onChange(this.value)
    this.onTouch()
  }
}

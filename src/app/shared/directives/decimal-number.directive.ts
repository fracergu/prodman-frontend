import { Directive, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[appDecimalNumber]',
})
export class DecimalNumberDirective {
  private REGEX = /^\d+(\.\d{0,2})?$/

  constructor(private _ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (['Backspace', 'Delete'].includes(event.key)) {
      return
    }

    const currentValue = this._ngControl.value || ''
    const futureValue = currentValue + event.key

    if (!this.REGEX.test(futureValue)) {
      event.preventDefault()
    }
  }
}

import { Directive, Input, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { combineLatest, Subject, takeUntil } from 'rxjs'

import { ZERO } from '../constants'

@Directive({
  selector: '[appAutoGenerateUsername]',
})
export class AutoGenerateUsernameDirective implements OnInit, OnDestroy {
  @Input() form!: FormGroup
  private _unsubscribe$ = new Subject<void>()

  ngOnInit() {
    if (this.form) {
      const nameControl = this.form.get('name')
      const lastNameControl = this.form.get('lastName')

      if (nameControl && lastNameControl) {
        const nameChanges = nameControl.valueChanges
        const lastNameChanges = lastNameControl.valueChanges

        combineLatest([nameChanges, lastNameChanges])
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(([name, lastName]) => {
            const username = this.generateUsername(name, lastName)
            this.form.patchValue({ username })
          })
      }
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  generateUsername(name: string, lastName: string): string {
    const SUBSTRING_LENGTH = 4
    const MAX_RANDOM_NUMBER = 100
    const username = (
      name.substring(ZERO, SUBSTRING_LENGTH) +
      lastName.substring(ZERO, SUBSTRING_LENGTH) +
      Math.floor(Math.random() * MAX_RANDOM_NUMBER)
    )
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    return username
  }
}

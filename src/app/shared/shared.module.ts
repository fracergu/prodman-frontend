import { NgModule } from '@angular/core';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

const PRIME_MODULES = [
  PasswordModule,
  ButtonModule,
  CheckboxModule,
  FormsModule,
  InputTextModule,
  DropdownModule,
];

@NgModule({
  declarations: [],
  imports: [...PRIME_MODULES],
  exports: [...PRIME_MODULES],
})
export class SharedModule {}

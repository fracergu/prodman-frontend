import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { ChartModule } from 'primeng/chart'
import { CheckboxModule } from 'primeng/checkbox'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { DataViewModule } from 'primeng/dataview'
import { DialogModule } from 'primeng/dialog'
import { DragDropModule } from 'primeng/dragdrop'
import { DropdownModule } from 'primeng/dropdown'
import { FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { KeyFilterModule } from 'primeng/keyfilter'
import { MessageModule } from 'primeng/message'
import { MessagesModule } from 'primeng/messages'
import { MultiSelectModule } from 'primeng/multiselect'
import { OrderListModule } from 'primeng/orderlist'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { PaginatorModule } from 'primeng/paginator'
import { PasswordModule } from 'primeng/password'
import { ProgressBarModule } from 'primeng/progressbar'
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag'
import { ToastModule } from 'primeng/toast'

import { NumericPadComponent } from './components/numeric-pad/numeric-pad.component'
import { ProductMultiSelectorComponent } from './components/product-multi-selector/product-multi-selector.component'
import { ProductSelectorComponent } from './components/product-selector/product-selector.component'
import { UserSelectorComponent } from './components/user-selector/user-selector.component'
import { AutoGenerateUsernameDirective } from './directives/auto-generate-username.directive'
import { DecimalNumberDirective } from './directives/decimal-number.directive'

const PRIME_MODULES = [
  PasswordModule,
  ButtonModule,
  CheckboxModule,
  FormsModule,
  InputTextModule,
  DropdownModule,
  DataViewModule,
  PaginatorModule,
  TagModule,
  OverlayPanelModule,
  AccordionModule,
  ConfirmPopupModule,
  ToastModule,
  TableModule,
  FileUploadModule,
  KeyFilterModule,
  MultiSelectModule,
  AutoCompleteModule,
  CalendarModule,
  OrderListModule,
  DragDropModule,
  MessageModule,
  MessagesModule,
  ProgressBarModule,
  DialogModule,
  ChartModule,
]

const APP_MODULES = [CommonModule, FormsModule, ReactiveFormsModule]

const APP_COMPONENTS = [
  UserSelectorComponent,
  ProductMultiSelectorComponent,
  NumericPadComponent,
  ProductSelectorComponent,
]

const APP_DIRECTIVES = [DecimalNumberDirective, AutoGenerateUsernameDirective]

@NgModule({
  declarations: [...APP_COMPONENTS, ...APP_DIRECTIVES],
  imports: [...PRIME_MODULES, ...APP_MODULES],
  exports: [
    ...PRIME_MODULES,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    ...APP_MODULES,
  ],
})
export class SharedModule {}

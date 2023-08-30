import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'

import { CategoriesListComponent } from './components/categories-list/categories-list.component'
import { CategoryFormComponent } from './components/category-form/category-form.component'
import { ProductFormComponent } from './components/product-form/product-form.component'
import { ProductsListComponent } from './components/products-list/products-list.component'
import { ProductsComponent } from './products.component'
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}

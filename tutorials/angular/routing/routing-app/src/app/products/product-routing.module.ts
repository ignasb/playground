import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail.component';

const ROUTES = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/edit', component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

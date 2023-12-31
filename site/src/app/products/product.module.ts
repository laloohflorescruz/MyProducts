import { NgModule } from '@angular/core';
import { ProductListComponent } from './productList/productList.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from '../services/product-resolver.service';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info/product-edit-info.component';
import { AuthGuard } from '../user/auth.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products',
        canActivate:[AuthGuard],
        children: [
          { path: '', component : ProductListComponent},
          {
            path: ':id',
            component: ProductDetailComponent,
            resolve: { resolvedData: ProductResolver }
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            resolve: { resolvedData: ProductResolver },
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
              },
              {
                path: 'info',
                component: ProductEditInfoComponent
              },
              {
                path: 'tags',
                component: ProductEditTagsComponent
              }
            ]
          }
        ]
      },
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent

  ]
})
export class ProductModule { }

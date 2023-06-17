import { Component, OnInit } from '@angular/core';
import { Product } from '../products-interface';
import { ProductService } from 'src/app/services/productService.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  product: Product | undefined;
  errorMessage: string | undefined;

  constructor(private prodService: ProductService) { }

  getProduct(id: number) {
    this.prodService.getProducts(id).subscribe({
      next: (product: any) => this.onProductRetrieved(product),
      error: (err: string | undefined) => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}

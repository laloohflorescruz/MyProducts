import { Component, OnInit } from '@angular/core';
import { Product, ProductResolved } from '../products-interface';
import { ProductService } from 'src/app/services/productService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | undefined;
  errorMessage: string | undefined;

  constructor(private prodService: ProductService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      const resolvedData : ProductResolved = 
     this.route.snapshot.data['resolvedData'];
     this.errorMessage = resolvedData.error;
     this.onProductRetrieved(resolvedData.product);
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

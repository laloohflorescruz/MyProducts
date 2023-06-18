import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/messages/messageService.service';
import { ProductService } from 'src/app/services/productService.service';
import { Product } from '../products-interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  pageTitle = 'Product Edit';
  errorMessage: string | undefined;

  product: Product | undefined;

  constructor(private prodService: ProductService,
    private msgService: MessageService) { }

  getProduct(id: number): void {
    this.prodService.getProducts(id).subscribe({
      next: product => this['onProductRetrieved'](product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product && this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product?.productName}?`)) {
        const Id = this.product?.id
        if (Id !== undefined) {
          this.prodService.deleteProduct(Id).subscribe(
            () => this.onSaveComplete(`${this.product?.productName} was deleted`),
            (err: string | undefined) => this.errorMessage = err
          );
        }
      }
    }
  }

  saveProduct(): void {
    if (true) {
      if (this.product && this.product.id === 0) {
        this.prodService.createProduct(this.product).subscribe(
          () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
          (err: string | undefined) => this.errorMessage = err
        );
      } else if (this.product && this.product.id !== 0) {
        this.prodService.updateProduct(this.product).subscribe(
          () => this.onSaveComplete(`The updated ${this.product?.productName} was saved`),
          (err: string | undefined) => this.errorMessage = err
        );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.msgService.addMessage(message);
    }
    // Navigate back to the product list
  }
}
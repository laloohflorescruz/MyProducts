import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/pageNotFound/messages/messageService.service';
import { ProductService } from 'src/app/services/productService.service';
import { Product, ProductResolved } from '../products-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  pageTitle = 'Product Edit';
  errorMessage: string | undefined;

  
  product!: Product;
  private dataIsValid: { [key: string]: boolean } = {};

  
  constructor(private prodService: ProductService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        const resolvedData: ProductResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.onProductRetrieved(resolvedData.product);
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


  
  getProduct(id: number): void {
    this.prodService.getProduct(id).subscribe({
      next: products => this.onProductRetrieved(products),
      error: err => this.errorMessage = err
    });
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

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }


  saveProduct(): void {
    if (true === true) { 
      if (this.product && this.product.id === 0) {
        this.prodService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else if (this.product && this.product.id !== 0) { 
        this.prodService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
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
    this.router.navigate(['/products']);
  }


  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
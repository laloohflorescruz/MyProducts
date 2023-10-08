import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../products-interface';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild('productForm', { static: false }) productForm: NgForm | undefined;

  errorMessage: string | undefined;
  product: Product = {
    productName: '', productCode: '', description: '',
    id: 0,
    category: '',
    releaseDate: '',
    price: 0,
    starRating: 0,
    imageUrl: ''
  }; // Initialize product here


 

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      if (this.productForm) {
        this.productForm.resetForm();
      }

      this.product = data['resolvedData'].product;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../products-interface';

@Component({
  selector: 'app-product-edit-tags',
  templateUrl: './product-edit-tags.component.html',
  styleUrls: ['./product-edit-tags.component.css']
})
export class ProductEditTagsComponent implements OnInit {
  errorMessage: string | undefined;
  newTags = '';
  product: Product = {
    productName: '', productCode: '', category: '', tags: [],
    id: 0,
    releaseDate: '',
    price: 0,
    description: '',
    starRating: 0,
    imageUrl: ''
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.product = data['resolvedData'].product;
    });
  }

  // Add the defined tags
  addTags(): void {
    if (!this.newTags) {
      this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
    } else {
      const tagArray = this.newTags.split(',').map(tag => tag.trim());
      this.product.tags = this.product.tags?.concat(tagArray);
      this.newTags = '';
      this.errorMessage = '';
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    if (this.product.tags && this.product.tags.length > idx) {
      this.product.tags.splice(idx, 1);
    }
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from './productService.service';
import { ProductResolved } from '../products/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    
    if (id === null || isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ product: null, error: message } as unknown as ProductResolved);
    }

    return this.productService.getProduct(+id).pipe(
      map(product => ({ product } as ProductResolved)),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message } as unknown as ProductResolved);
      })
    );
  }
}

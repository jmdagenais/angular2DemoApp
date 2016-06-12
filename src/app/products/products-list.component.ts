import { Component, OnInit } from '@angular/core';

import { IProduct } from '../types/products';
import { ProductDetailsComponent } from './product-details.component';
import { FavoritesService, ProductsService } from '../shared/';
import { OrderBy } from '../shared/order-by.pipe';

import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'products-list',
    templateUrl: 'products-list.component.html',
    styleUrls: ['products-list.component.css'],
    directives: [ProductDetailsComponent, ROUTER_DIRECTIVES],
    pipes: [OrderBy]
})
export class ProductsListComponent implements OnInit {
   
   constructor(
       private _favoritesService:FavoritesService,
       private _productsService:ProductsService,
       private _router:Router) {   
   }  
   
    onSelect(product:IProduct, navigate:boolean) {   
        if (navigate) {
             this._router.navigate(['/products', product.id]);
        } else {
            this.selectedProduct = product;
        }
    }
    
    sortList(propertyName:string) {
        if (!this.asc) {
            propertyName = "-" + propertyName;
        } else {
            propertyName = propertyName.replace("-", "");
        }
        this.asc = !this.asc;
        this.sorter = propertyName;
    }
       
   sorter:string = "-price";
   asc:boolean = false;
   selectedProduct:IProduct;
   products:IProduct[] = [];
   title:string = "My Products";
   message:string;
   
   get favoritesNb(): number {
       return this._favoritesService.favorites.size;
   }
   
   newFavorite(product) {
       this.message = `Product ${product.name} 
       added to favorites!`;
   }

   ngOnInit() {
       this.loadProducts();
   }
   
   loadProducts() {
       
       if (!this._productsService.products) {
           // Get products from server
            this._productsService
                .getProducts()
                .subscribe(
                    data => this.products = data,
                    error => console.log(error)
                );
       } else {
           // Products already in local cache
           this.products = this._productsService.products;
       }
      
   }
}
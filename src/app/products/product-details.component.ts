import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { IProduct } from '../types/products';

import { ProductsService, FavoritesService } from '../shared/';
import { OnActivate, RouteSegment } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'product-details',
    templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent implements OnInit, OnActivate {
        
    @Input() product:IProduct;
    @Output() addedToFavorites = new EventEmitter<IProduct>();
    
    addToFavorites(product:IProduct) {
        this.addedToFavorites.emit(product);
        
       this._favoritesService.addToFavorites(product);
    }
    
    routerOnActivate(current:RouteSegment) {
        let id = + current.getParam("id");
        this.product = this._productsService.getProductById(id);
    }
    
    constructor(
        private _productsService:ProductsService,
        private _favoritesService:FavoritesService) { }
    
    ngOnInit() { }

}
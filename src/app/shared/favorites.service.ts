import { Injectable } from '@angular/core';
import { IProduct } from '../types/products';

@Injectable()
export class FavoritesService {

    favorites:Set<IProduct> = new Set<IProduct>();
    
    addToFavorites(product) {
        this.favorites.add(product);
    }

    constructor() { }

}
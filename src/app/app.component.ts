import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import 'rxjs/Rx'; // load the full rxjs

import { ProductsRouterComponent } from './products/products';
import { ContactComponent } from './common/contact.component';
import { ProductsService, FavoritesService } from './shared/';

@Component({
    moduleId: module.id,
    selector: 'store-app',
    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductsService, FavoritesService]
})
@Routes([
    { path: '/products', component: ProductsRouterComponent },
    { path: '/contact', component: ContactComponent }    
])
export class AppComponent {}
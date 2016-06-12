import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { ProductsListComponent } from './products-list.component';
import { ProductDetailsComponent } from './product-details.component';
import { ProductInsertComponent } from './product-insert.component';

@Component({
    moduleId: module.id,
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '/',        component: ProductsListComponent },
    { path: '/insert',  component: ProductInsertComponent },
    { path: '/:id',     component: ProductDetailsComponent }
])
export class ProductsRouterComponent {}
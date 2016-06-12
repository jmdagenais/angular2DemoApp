import { Component, OnInit } from '@angular/core';
import { FormBuilder, Control, ControlGroup, Validators, FORM_DIRECTIVES } from '@angular/common';
import {Router, RouteTree, CanDeactivate} from '@angular/router';
import { DialogService, ProductsService } from '../shared/';

@Component({
    moduleId: module.id,
    templateUrl: 'product-insert.component.html',
    styleUrls: ['product-insert.component.css'],
    directives: [FORM_DIRECTIVES],
    providers:[FormBuilder, DialogService]
})
export class ProductInsertComponent implements OnInit, CanDeactivate {
    
    insertForm: ControlGroup;
    name:Control;
    price:Control;
    description:Control;
    
    constructor(
        private _fb:FormBuilder,
        private _productsService:ProductsService,
        private _router: Router, 
        private _dialog: DialogService
    ) { }
    
    routerCanDeactivate(curr: RouteTree, prev: RouteTree) : any {
        // Allow synchronous navigation (`true`) if no product or the product is unchanged.
        if (!this.insertForm.value || !this.isDirty) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this._dialog.confirm('Discard changes?');
    }

    ngOnInit() { 
        
        this.name = new Control('',
            Validators.compose([
                Validators.required
            ]));
            
         this.price = new Control('',
            Validators.compose([
                Validators.required
            ]));
            
         this.description = new Control('',
            Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]));
            
         this.insertForm = this._fb.group({
             'name': this.name,
             'price': this.price,
             'description': this.description
         });
        
    }
    
    onSubmit() {
        console.log(JSON.stringify(this.insertForm.value));
        this._productsService.insertProduct(this.insertForm.value);
        this.resetForm();
        this.goToList();
    }
    
    goToList() {
        this._router.navigate( ['/products'] );
    }
    
    resetForm() {
        this.insertForm.value.name = '';
        this.insertForm.value.price = '';
        this.insertForm.value.description = '';
    }
    
    get isDirty() {
        return this.insertForm.value.name != ''
        || this.insertForm.value.price != ''
        || this.insertForm.value.description != '';
    }

}
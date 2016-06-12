import { Injectable } from '@angular/core';
import { IProduct } from '../types/products';
import { Http, Response, Headers } from '@angular/http';
import { Observable, } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {
    
    apiEndPoint:string = "http://storerestservice.azurewebsites.net/api/products/";
    products:IProduct[];

    constructor(private _http:Http) { }
    
    insertProduct(newProduct:IProduct) {
        
        newProduct.modifiedDate = new Date();
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        this._http.post(
            this.apiEndPoint,
            JSON.stringify(newProduct), { headers: headers })
            .map(res => res.json())
            .subscribe(
                data => {
                        console.log('New Product Posted');
                        console.log(data);
                        this.products.push(<IProduct>data);
                    },
                err => console.log(err)
            );
    }
    
    getProductById(id:number) {
        return this.products.filter(p => p.id === id)[0];
    }
    
    getProducts(): Observable<IProduct[]> {            
        return this._http
                .get(this.apiEndPoint)
                .map((res:Response) => {
                    this.products = res.json();
                    return this.products
                })
                .catch(this.handleError);
    }
    
    handleError(error: any) {
        console.log('Error ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
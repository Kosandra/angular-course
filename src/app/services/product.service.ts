import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";
import {products} from "../data/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = []

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        // fromString: 'limit=5',
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(500),
      retry(3),
      tap(products => this.products = products as IProduct[]),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

  create(product: IProduct): Observable<IProduct>{
    console.log(product);
    console.log(JSON.stringify(product))
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(
      tap(prod => {
        this.products.push(prod)
        console.log(this.products)
      })
    )
  }
}

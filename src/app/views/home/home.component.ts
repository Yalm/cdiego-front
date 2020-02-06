import { Component } from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Pagination } from 'src/app/models/pagination.model';
import { MatSnackBar } from '@angular/material';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {

    pagination$: Observable<Pagination<Product>>;
    sliders: any[];

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly shoppingCartService: ShoppingCartService,
        private readonly productService: ProductService
    ) {
        this.pagination$ = this.productService.index();
        this.sliders = [
            { image: 'assets/img/home.png' },
            { image: 'assets/img/home.png' }
        ];
    }

    addCartProduct(product: Product) {
        if (product.stock > 0) {
            this.shoppingCartService.add({ ...product, quantity: 1 });
            this.snackBar.open('Su producto ha sido agregado.', 'Ok', { duration: 5000 });
        }
    }
}

import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomParams } from 'src/app/models/params.model';
import { PageEvent, MatSnackBar } from '@angular/material';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
    selector: "app-shop",
    templateUrl: "./shop.component.html",
    styleUrls: ["./shop.component.scss"]
})
export class ShopComponent {

    pagination$: Observable<Pagination<Product>>;
    filters$: Observable<CustomParams>;
    categories$: Observable<Category[]>;

    constructor(
        private readonly productService: ProductService,
        private readonly shoppingCartService: ShoppingCartService,
        private readonly categoryService: CategoryService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
        this.pagination$ = this.route.queryParams.pipe(
            switchMap(query => this.productService.index(query))
        );

        this.filters$ = this.route.queryParams.pipe(
            map(params => new CustomParams({ params, only: ['category', 'search'] }))
        );

        this.categories$ = this.categoryService.index();
    }

    setFilter(name: string, value: number) {
        this.router.navigate(['/shop'], { queryParams: { [name]: value }, queryParamsHandling: 'merge' });
    }

    removeFilter(key: string, params: CustomParams) {
        const queryParams = params.delete(key);
        this.router.navigate(['/shop'], { queryParams });
    }

    page(event: PageEvent) {
        this.router.navigate(['/shop'], {
            queryParams: { results: event.pageSize, page: event.pageIndex + 1 },
            queryParamsHandling: 'merge'
        });
    }

    addCartProduct(product: Product) {
        if (product.stock > 0) {
            this.shoppingCartService.add({ ...product, quantity: 1 });
            this.snackBar.open('Su producto ha sido agregado.', 'Ok', { duration: 5000 });
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
    form: FormGroup;
    categories: Observable<Category[]>;

    constructor(
        public categoryService: CategoryService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        const product = this.route.snapshot.data.product;
        this.form = new FormGroup({
            id: new FormControl(product.id, Validators.required),
            name: new FormControl(product.name, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
            price: new FormControl(product.price, [Validators.required, Validators.min(5)]),
            stock: new FormControl(product.stock, [Validators.required, Validators.min(0)]),
            shortDescription: new FormControl(product.shortDescription,
                [Validators.required, Validators.minLength(5), Validators.maxLength(500)]
            ),
            category: new FormControl(product.category ? product.category.id : null, Validators.required),
            cover: new FormControl(product.cover, Validators.required),
            description: new FormControl(product.description, Validators.minLength(10))
        });

        this.categories = this.categoryService.index();
    }

    edit(): void {
        this.productService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Producto editado.', 'OK', { duration: 5000 });
        });
    }
}

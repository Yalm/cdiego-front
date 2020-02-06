import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product/product.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.sass']
})
export class ProductCreateComponent implements OnInit {

    form: FormGroup;
    categories: Observable<Category[]>;

    constructor(
        public categoryService: CategoryService,
        private snackBar: MatSnackBar,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
            price: new FormControl(null, [Validators.required, Validators.min(5)]),
            stock: new FormControl(null, [Validators.required, Validators.min(0)]),
            shortDescription: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
            category: new FormControl(null, Validators.required),
            cover: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.minLength(10)),
        });

        this.categories = this.categoryService.index();
    }

    store() {
        this.productService.store(this.form.value).subscribe(() => {
            this.snackBar.open('Producto creado.', 'OK', { duration: 5000 });
            this.form.reset();
        });
    }
}

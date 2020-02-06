import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

    form: FormGroup;

    constructor(
        private categoryService: CategoryService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(250), Validators.minLength(5)])
        });
    }

    store() {
        this.categoryService.store(this.form.value).subscribe(() => {
            this.snackBar.open('Categoría creada.', 'OK', { duration: 4000 });
            this.form.reset();
        }, (error: HttpErrorResponse) => {
            if (error.status === 422) {
                this.form.get('name').setErrors({ unique: true });
            }
        });
    }
}

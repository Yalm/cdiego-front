import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.sass']
})

export class CategoryEditComponent implements OnInit {
    form: FormGroup;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const category = this.route.snapshot.data.category;
        this.form = new FormGroup({
            id: new FormControl(category.id),
            name: new FormControl(category.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)])
        });
    }

    edit(): void {
        this.categoryService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Categoría actualizada.', 'OK', { duration: 5000 });
        }, (error: HttpErrorResponse) => {
            if (error.status === 422) {
                this.form.get('name').setErrors({ unique: true });
            }
        });
    }
}

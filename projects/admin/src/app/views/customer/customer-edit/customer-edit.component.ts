import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdentificationDocument } from 'src/app/models/identification-document.model';
import { Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/identification-document/identification-document.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { Order } from 'src/app/models/order.model';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.sass']
})
export class CustomerEditComponent implements OnInit {
    form: FormGroup;
    documents: Observable<IdentificationDocument[]>;
    displayedColumns: string[] = ['id', 'amount', 'payment_type', 'state', 'edit'];
    dataSource = new MatTableDataSource<Order>();
    length$: Observable<number>;

    constructor(
        public documentService: DocumentService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private customerService: CustomerService
    ) { }

    ngOnInit() {
        const customer = this.route.snapshot.data.customer;
        this.form = new FormGroup({
            id: new FormControl(customer.id, [Validators.required]),
            name: new FormControl(customer.name, [Validators.required]),
            surnames: new FormControl(customer.surnames, [Validators.required]),
            document: new FormControl(customer.document ? customer.document.id : null, [Validators.required]),
            documentNumber: new FormControl(customer.documentNumber, [Validators.required]),
            phone: new FormControl(customer.phone, [Validators.required]),
            email: new FormControl(customer.email, [Validators.required, Validators.email])
        });

        this.length$ = this.form.get('document').valueChanges.pipe(
            startWith(customer.document ? customer.document.id : 1),
            map(id => id === 1 ? 8 : 11)
        );

        this.dataSource.data = customer.orders;
        this.documents = this.documentService.index();
    }

    update() {
        this.customerService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Cliente editado.', 'OK', { duration: 5000 });
        }, error => {
            if (error.status === 422) {
                this.form.get('email').setErrors({ unique: true });
            }
        });
    }
}

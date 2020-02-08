import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { MatPaginator } from '@angular/material';
import { PetDataSource } from 'projects/admin/src/app/shared/class/pet-datasource';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth/auth.service';

@Component({
    selector: 'app-profile-order',
    templateUrl: './profile-order.component.html',
    styleUrls: ['./profile-order.component.sass']
})
export class ProfileOrderComponent implements OnInit {

    dataSource: PetDataSource<Order[]>;
    displayedColumns: string[] = ['id', 'created_at', 'state', 'amount'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient, private auth: AuthService) { }

    ngOnInit() {
        const user = this.auth.getPayload();
        this.dataSource = new PetDataSource({
            url: 'orders',
            http: this.http,
            params: { where: { customerId: user.sub }, relations: ['state'] },
            paginator: this.paginator
        });
    }
}

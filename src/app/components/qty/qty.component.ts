import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-qty',
    templateUrl: './qty.component.html',
    styleUrls: ['./qty.component.sass']
})
export class QtyComponent {

    @Input() product: CartItem;
    @Input() btn = true;
    @Input() quantity = 1;

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly shoppingCartService: ShoppingCartService
    ) { }

    quantityUp(): void {
        if (this.quantity >= this.product.stock) {
            this.quantity = this.quantity;
        } else {
            this.quantity++;
        }
        this.updateItem();
    }

    quantityDown(): void {
        if (this.quantity <= 1) {
            this.quantity = this.quantity;
        } else {
            this.quantity--;
        }
        this.updateItem();
    }

    private updateItem(): void {
        if (!this.btn) {
            this.product.quantity = this.quantity;
            this.shoppingCartService.update(this.product);
        }
    }

    addCartProduct(): void {
        this.shoppingCartService.add({ quantity: this.quantity, ... this.product });
        this.snackBar.open('Su producto ha sido agregado.', 'Ok', { duration: 5000 });
    }
}

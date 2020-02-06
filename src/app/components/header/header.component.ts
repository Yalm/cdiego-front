import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    form: FormGroup;
    searchActive: boolean;

    constructor(
        private router: Router,
        public auth: AuthService,
        public shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            search: new FormControl(null, [Validators.required, Validators.minLength(3)])
        });
    }

    search(): void {
        if (this.form.valid) {
            const search = this.form.value.search.trim().toLowerCase();
            this.searchActive = false;
            this.router.navigate(['/shop'], { queryParams: { search }, queryParamsHandling: 'merge' });
            this.form.reset();
        }
    }
}

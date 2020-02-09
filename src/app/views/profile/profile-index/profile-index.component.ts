import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-index',
    templateUrl: './profile-index.component.html',
    styleUrls: ['./profile-index.component.sass']
})
export class ProfileIndexComponent {

    constructor(public auth: AuthService, private router: Router) { }

    logout(): void {
        this.auth.signOut();
        this.router.navigateByUrl('/');
    }
}

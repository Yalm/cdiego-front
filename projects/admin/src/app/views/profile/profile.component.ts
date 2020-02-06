import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material';
import { EqualsValidator } from 'src/app/validators/equals.validator';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    user: User;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private userService: UserService
    ) { }

    ngOnInit() {
        const { sub } = this.auth.getPayload();
        this.userService.show(sub).subscribe(response => {
            this.user = response;
            this.firstFormGroup = new FormGroup({
                id: new FormControl(sub, Validators.required),
                name: new FormControl(this.user.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
                surnames: new FormControl(this.user.surnames, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
                email: new FormControl(this.user.email, [Validators.required, Validators.email])
            });
        });

        this.secondFormGroup = new FormGroup({
            current_password: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(6)]),
            password: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(6)]),
            password_confirmation: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(6)])
        });
        this.secondFormGroup.get('password_confirmation').setValidators(EqualsValidator(this.secondFormGroup.get('password')));
    }

    update(): void {
        this.userService.update(this.firstFormGroup.value).subscribe(() => {
            this.snackBar.open('Datos actualizados.', 'OK', { duration: 3000 });
        }, ({ status }) => {
            if (status === 422) {
                this.firstFormGroup.get('email').setErrors({ unique: true });
            }
        });
    }

    changePassword() {
        this.userService.password(this.secondFormGroup.value).subscribe(() => {
            this.snackBar.open('Datos actualizados.', 'OK', { duration: 3000 });
            this.secondFormGroup.reset();
        }, ({ status, error }) => {
            if (status === 422) {
                this.snackBar.open(error.message, 'OK', { duration: 9000, panelClass: ['bg-danger', 'text-white'] });
            }
        });
    }
}

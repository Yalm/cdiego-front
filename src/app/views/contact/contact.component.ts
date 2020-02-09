import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
    form: FormGroup;
    success: boolean;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            subject: new FormControl("", Validators.required),
            message: new FormControl("", Validators.required)
        });
    }
    sendEmail(formDirective: FormGroupDirective) {
        formDirective.resetForm();
        this.http.post('orders/contact', this.form.value).subscribe(() => {
            this.form.reset();
            this.success = true;
            setTimeout(() => {
                this.success = false;
            }, 2000);
        });
    }
}

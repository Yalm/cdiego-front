import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
    form: FormGroup;
    success: boolean;

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            subject: new FormControl("", Validators.required),
            message: new FormControl("", Validators.required)
        });
    }
    sendEmail() {
        this.success = true;
        this.form.reset();
        setTimeout(() => {
            this.success = false;
        }, 2000);
    }
}

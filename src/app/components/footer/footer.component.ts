import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category/category.service";
import { Category } from "src/app/models/category.model";
import { Observable } from "rxjs";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private category: CategoryService) { }

    ngOnInit() {
        this.categories$ = this.category.index();
    }
}

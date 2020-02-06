import { Pipe, PipeTransform } from '@angular/core';
import { UbigeosService } from 'src/app/services/ubigeos/ubigeos.service';
import { Observable, of } from 'rxjs';
import { Shipping } from 'src/app/models/Order.model';

@Pipe({
    name: 'shipping'
})
export class ShippingPipe implements PipeTransform {
    constructor(private ubigeo: UbigeosService) { }

    transform(value: Shipping, ...args: any[]): Observable<string> {
        let returnValue: Observable<string>;
        switch (args[0]) {
            case 'departament':
                returnValue = this.ubigeo.department(value.departamentId);
                break;
            case 'province':
                returnValue = this.ubigeo.province(value.departamentId, value.provinceId);
                break;
            default:
                returnValue = of(null);
                break;
        }
        return returnValue;
    }
}

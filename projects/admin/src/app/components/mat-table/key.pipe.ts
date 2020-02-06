import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'key'
})
export class KeyPipe implements PipeTransform {

    transform(iterator: any, columnName: string): string {
        const value = columnName.split('.').reduce((obj, key) => {
            return obj = obj[key] ? obj[key] : {};
        }, iterator);
        return typeof value === 'object' ? '-' : value;
    }
}

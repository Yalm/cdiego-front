import { Category } from './category.model';

export interface Product {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly cover: string;
    readonly url: string;
    stock: number;
    readonly description: string;
    readonly shortDescription: string;
    readonly category_id: number;
    readonly category: Category;
    readonly transport?: Transport;
}

interface Transport {
    readonly id?: number;
    readonly depth: string;
    readonly height: number;
    readonly weight: string;
    readonly width: string;
}

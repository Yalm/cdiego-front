import { Order } from 'src/app/models/order.model';
import { IdentificationDocument } from 'src/app/models/identification-document.model';

export interface Customer {
    id: string;
    email: string;
    avatar?: string;
    name: string;
    surnames?: string;
    document?: IdentificationDocument;
    documentNumber?: number;
    phone?: number;
    orders_count?: number;
    orders?: Order[];
}

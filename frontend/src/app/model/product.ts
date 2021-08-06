export class Product {
    _id: string = '';
    name: string = '';
    goodFor: string[] = [];
    weight?: number
    size?: string;
    material?: string;
    price: number = 0;
    active?: boolean;
    organic?: boolean;
}

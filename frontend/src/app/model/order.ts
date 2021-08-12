export class Order {
    _id: string = '';
    user: string = '';
    products: string = '';
    time?: string = (new Date()).toLocaleString();
    note?: string;
}

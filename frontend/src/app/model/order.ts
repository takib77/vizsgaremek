export class Order {
    _id: string = '';
    user: string = '';
    products: string = '';
    time?: Date = new Date();
    note?: string;
}

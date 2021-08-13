export class Order {
    _id: string = '';
    user: string = '';
    products: string = '';
    time?: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // time?: string = (new Date()).toLocaleString();
    note?: string;
}

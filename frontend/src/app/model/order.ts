import { Product } from "./product";
import { User } from "./user";

export class Order {
    _id: string | number = 0;
    user?: User;
    products?: Product[];
    time?: Date;
    note?: string;
}

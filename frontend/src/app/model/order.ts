import { Product } from "./product";
import { User } from "./user";

export class Order {
    id: string | number = 0;
    user?: User = new User();
    products?: Product[];
    time?: Date = new Date();
    note?: string;
}

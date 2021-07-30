import { Product } from "./product";
import { User } from "./user";

export class Order {
    id: string | number = 0;
    user?: User;
    products?: Product[];
    time?: Date;
    note?: string;
}

import { Address } from "./address";

export class User {
    _id: string = '';
    first_name?: string = '';
    last_name?: string = '';
    address: Address = new Address();
    email: string = '';
    password?: string = '';
    role?: number = 1;
    accessToken?: string;
}

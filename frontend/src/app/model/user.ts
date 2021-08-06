export class User {
    _id: string = '';
    first_name: string = '';
    last_name: string = '';
    address?: Address = {};
    email: string = '';
    password?: string = '';
    role?: number = 0;
    token?: string;
}

export interface Address {
    country?: string;
    city?: string;
    street?: string;
}
export class MyEvent {
    _id: string = '';
    city: string = '';
    place: string = '';
    date?: string = new Date().toISOString().slice(0, 10).replace('T', ' ');
    time?: number;
}
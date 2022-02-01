export interface Price {
    id: number|any;
    price: number;
    currency: string;
    ref_assignto: string;
    ref_price: string;
}
export class PriceDM {
    ref_price = "";
    ref_assignto = "";
    id = 0;
    price = 0;
    currency = "";
    readFromObj(data: Price): void {
    this.ref_price = data.ref_price;
    this.ref_assignto = data.ref_assignto;
    this.id = data.id;
    this.price = data.price;
    this.currency = data.currency;
    }

    clone(): PriceDM {
        var data = new PriceDM();
        data.ref_price = this.ref_price;
        data.ref_assignto = this.ref_assignto;
        data.id = this.id;
        data.price = this.price;
        data.currency = this.currency;
        return data;
    }
}

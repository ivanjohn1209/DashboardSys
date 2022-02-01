import { IsEmpty } from "../utility/ToolFtc";

export interface Product {
    ref_product: string,
    ref_assignto: string,
    id: number,
    name: string,
    description: string;
    img_profile: string;
}

export interface Service {
    ref_service: string,
    ref_assignto: string,
    id: number,
    name: string,
    description: string
}
export class ProductDM {
    ref_product = "";
    ref_assignto = "";
    id = 0;
    name = "";
    description = "";
    img_profile = "";
    readFromObj(data: Product): void {
    this.ref_product = data.ref_product;
    this.ref_assignto = data.ref_assignto;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.img_profile = IsEmpty(data.img_profile) ? "/assets/img/default-img.png" : data.img_profile ;
    }

    clone(): ProductDM {
        var data = new ProductDM();
        data.ref_product = this.ref_product;
        data.ref_assignto = this.ref_assignto;
        data.id = this.id;
        data.name = this.name;
        data.description = this.description;
        data.img_profile = this.img_profile;
        return data;
    }
}

export class ServiceDM {
    ref_service = "";
    ref_assignto = "";
    id = 0;
    name = "";
    description = "";

    readFromObj(data: Service): void {
    this.ref_service = data.ref_service;
    this.ref_assignto = data.ref_assignto;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    }

    clone(): ServiceDM {
        var data = new ServiceDM();
        data.ref_service = this.ref_service;
        data.ref_assignto = this.ref_assignto;
        data.id = this.id;
        data.name = this.name;
        data.description = this.description;
        
        return data;
    }
}

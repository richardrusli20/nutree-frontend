export class Product {
    id:number;
    name:string;
    price:number;

    constructor(id,name='',price=0){
        this.id=id
        this.name=name
        this.price=price
    }
}

export class Product{
    constructor(
    public id?:number | null, public sku?:string | null, public name?:string | null, 
    public price?:string | null, public made?:string | null, 
    public description?:string | null, public category?:string | null, 
    public create_date?:string | null, public quantity?:string | null, 
    public status?:string | null ){
    }
}
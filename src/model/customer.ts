export class Customer{
    constructor(
    public id?:number | null, public name?:string | null, public surname?:string | null, 
    public email?:string | null, public username?:string | null,  
    public password?:string | null, public address?:string | null, 
    public phone?:string | null, public role?:string | null, 
    public status?:string | null ){
        
    }
}
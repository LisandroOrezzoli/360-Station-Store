import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer } from 'src/model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
  
  customer: Customer ={
    id: null,
    name: null,
    surname: null,
    email: null,
    username: null,
    password: null,
    address: null,
    phone: null,
    role: null,
    status: null,
  };

  selectedCustomer: Customer ={
    id: null,
    name: null,
    surname: null,
    email: null,
    username: null,
    password: null,
    address: null,
    phone: null,
    role: null,
    status: null,
  };
  
  constructor(private customerService: CustomerService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll(){
    this.customerService.getAll().subscribe(
      (result: any) =>{
          let customers: Customer[] = [];
          for (let i = 0; i < result.length; i++) {
            let customer = result[i] as Customer;
            customers.push(customer);            
          }
          this.customers = customers;
      },
      error => {
        console.log(error);
      }
      )
  }

  showSaveDialog(editar: boolean){
    if (editar) {
      if (this.selectedCustomer != null && this.selectedCustomer.id != null) {
        this.customer = this.selectedCustomer;
    } else {
      this.messageService.add({severity : 'warn', summary : 'Advertencia', detail : 'Por favor seleccione un registro'})
      return;
      }
    }else {
      this.customer = new Customer();
    }
    this.displaySaveDialog = true;
  }

  save(){
    this.customerService.save(this.customer).subscribe(
      (result:any) => {
        let customer = result as Customer;
        this.validarPersona(customer);
        this.messageService.add({severity: 'Success.', summary: "Resultado.", detail: "Se ha guardado correctamente."});
        this.displaySaveDialog = false;

      },
      error =>{
        console.log(error);
      }
    );
  }

  delete(){
    if(this.selectedCustomer == null || this.selectedCustomer.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
      return;
    }
    this.confirmService.confirm({
      message: "¿Está seguro que desea eliminar el registro?",
      accept : () =>{
        this.customerService.delete(this.selectedCustomer.id).subscribe(
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se eliminó la persona con id "+result.id+" correctamente." });
            this.daleteObject(result.id);
          }
        )
      }
    })
  }
  daleteObject(id:number){
    let index = this.customers.findIndex((e) => e.id == id);
    if (index !=1) {
      this.customers.splice(index, 1);
      
    }
  }

  validarPersona(customer: Customer){
    let index = this.customers.findIndex((e) => e.id == customer.id);

    if(index != -1){
      this.customers[index] = customer;
    }else{
      this.customers.push(customer);
    }
  }

  ngOnInit() {
   this.getAll();
   this.cols = [
     {field: "id", header: "ID"},
     {field: "name", header: "Name"},
     {field: "surname", header: "Surname"},
     {field: "address", header: "Address"},
     {field: "phone", header: "Phone"},
     {field: "role", header: "Role"},
     {field: "status", header: "Status"},
   ];

   this.items = [
     {
        label : "Nuevo",
        icon : 'pi pi-fw pi-plus',
        command : ()=> this.showSaveDialog(false)
     },
     {
      label : "Editar",
      icon : 'pi pi-fw pi-pencil',
      command : ()=> this.showSaveDialog(true)
     },
     {
       label : "Eliminar",
       icon : "pi pi-fw pi-times",
       command : () => this.delete()
     }
   ]
  }
}

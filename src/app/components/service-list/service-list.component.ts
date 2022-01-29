import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, ServiceDM } from 'src/app/interface/product-services.model';
import { ProductServicesService } from 'src/app/service/product-services.service';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  serviceList: ServiceDM[] = [];
  dataSource = ELEMENT_DATA;
  ref_assignto: string = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  isEdit: boolean =  false;
  @ViewChild(ServiceDetailComponent) serviceDetailComp!: ServiceDetailComponent;

  constructor(private serviceAPI: ProductServicesService) { }

  ngOnInit(): void {
    this.getList()
  }
  getList(): void {
    this.serviceAPI.getServiceList(this.ref_assignto)
    .subscribe(res => {
      let list = []
      for (let i = 0; i < res.length; i++) {
          var item = new ServiceDM();
          item.readFromObj(res[i])
          list.push(item)
      }
      this.serviceList = list;
    })
  }

  onItemClick(item: ServiceDM): void {
    this.isEdit = true;
    setTimeout(() => {
      this.serviceDetailComp.setData(item.clone())
    }, 100);
  }

  onCancel(){
    this.isEdit = false;
  }

  afterSave(item: Service|any){
    var index = this.serviceList.findIndex((e) => e.ref_service === item.ref_service);
    if(index >= 0)
      this.serviceList[index] = item;
    else 
      this.serviceList.push(item)
  }

  onAdd(): void {
    let newData = new ServiceDM()
    newData.ref_assignto = this.ref_assignto;
    this.isEdit = true;
    setTimeout(() => {
     this.serviceDetailComp.setData(newData)
      }, 100);
  }

  afterDelete(){
    this.isEdit = false;
    this.getList()
  }
}

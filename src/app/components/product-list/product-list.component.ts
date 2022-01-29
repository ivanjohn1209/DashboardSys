import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductDM } from 'src/app/interface/product-services.model';
import { ProductServicesService } from 'src/app/service/product-services.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description'];
  productlist: ProductDM[] = [];
  productEdit: ProductDM = new ProductDM()
  isEdit: boolean =  false;
  ref_assignto: string = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  @ViewChild(ProductDetailComponent) productDetailComp!: ProductDetailComponent;

  constructor(private productService: ProductServicesService) {
   }

  ngOnInit(): void {
    this.getList()
  } 

  getList(): void {
    this.productService.getProductList(this.ref_assignto)
    .subscribe(res => {
      let list = []
      for (let i = 0; i < res.length; i++) {
          var item = new ProductDM;
          item.readFromObj(res[i])
          list.push(item)
      }
      this.productlist = list;
    })
  }

  onItemClick(item: ProductDM): void {
   this.isEdit = true;
   setTimeout(() => {
    this.productDetailComp.setData(item.clone())
     }, 100);
  }

  onCancel(): void{
    this.isEdit = false;
  }
  onAdd(){
    let newData = new ProductDM()
    newData.ref_assignto = this.ref_assignto;
    this.isEdit = true;
    setTimeout(() => {
     this.productDetailComp.setData(newData)
      }, 100);
  }
  afterSave(item: Product|any){
    var index = this.productlist.findIndex((e) => e.ref_product === item.ref_product);
    if(index >= 0)
      this.productlist[index] = item;
    else 
      this.productlist.push(item)
  }

  afterDelete(){
    this.isEdit = false;
    this.getList()
  }
}

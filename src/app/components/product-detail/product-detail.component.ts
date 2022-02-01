import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product, ProductDM } from 'src/app/interface/product-services.model';
import { ProductServicesService } from 'src/app/service/product-services.service';
import { IsEmpty } from 'src/app/utility/ToolFtc';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { PriceTableComponent } from '../price-table/price-table.component';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Output() afterDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild(ImageGalleryComponent) imageGallery!: ImageGalleryComponent;
  @ViewChild(PriceTableComponent) priceTable!: PriceTableComponent;

  IsEmpty = IsEmpty
  productData: Product = new ProductDM()

  constructor(private productService: ProductServicesService) { }

  ngOnInit(): void {
  }

  onSave(): void {
      this.productService.upsertProduct(this.productData)
      .subscribe(res => {
        let data = new ProductDM()
        data.readFromObj(res)
        this.productData = data;
        this.afterSave.emit(data)
      })
  }
  setData(data: Product): void {
    this.productData = data;
    setTimeout(() => {
      if(!IsEmpty(data.ref_product)){
        this.imageGallery.setRefs(data.ref_product)  
        this.priceTable.setRefs(data.ref_product)
      }
    }, 100);
  }
  
  cancel(): void {
    this.onCancel.emit()
  }

  onDelete(): void{
    let { ref_assignto, ref_product } = this.productData;
    this.productService.deleteProduct(ref_assignto, ref_product)
    .subscribe(res => {
      this.afterDelete.emit()
    })
  }
}

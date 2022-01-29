import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Service, ServiceDM } from 'src/app/interface/product-services.model';
import { ProductServicesService } from 'src/app/service/product-services.service';
import { IsEmpty } from 'src/app/utility/ToolFtc';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';

@Component({
  selector: 'service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Output() afterDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild(ImageGalleryComponent) imageGallery!: ImageGalleryComponent;
  IsEmpty = IsEmpty
  serviceData: Service =  new ServiceDM()
  constructor(private serviceAPI: ProductServicesService) { }

  ngOnInit(): void {
  }
  setData(data: ServiceDM): void {
    this.serviceData = data;
    setTimeout(() => {
    if(!IsEmpty(data.ref_service))
     this.imageGallery.setRefs(data.ref_service)   
    }, 100);
  }

  onSave(): void{
    this.serviceAPI.upsertService(this.serviceData)
    .subscribe((res: any) => {
      var data = new ServiceDM();
      data.readFromObj(res);
      this.serviceData = data;
      this.afterSave.emit(data);
    })
  }

  cancel(): void {
    this.onCancel.emit()
  }

  onDelete(): void {
    let { ref_assignto, ref_service } = this.serviceData;
    this.serviceAPI.deleteService(ref_assignto, ref_service)
    .subscribe(res => {
      this.afterDelete.emit()
    })
  }
}

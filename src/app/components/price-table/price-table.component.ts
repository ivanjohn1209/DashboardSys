import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Price, PriceDM } from 'src/app/interface/price';
import { PriceService } from 'src/app/service/price.service';
import { IsEmpty } from 'src/app/utility/ToolFtc';
import { ModalComponent } from '../modal/modal.component';
import { PriceDetailComponent } from '../price-detail/price-detail.component';

/**
 * @title Basic table
 */
@Component({
  selector: 'price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.css']
})
export class PriceTableComponent implements OnInit {
  displayedColumns = ['position', 'price', 'currency', 'action'];
  @Input() ref_assignto: string = "";
  priceList: PriceDM[] = [];
  showModal: boolean = false;
  modalTitle: string = "Add Price";
  
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(PriceDetailComponent) priceDetail!: PriceDetailComponent;

  constructor(private priceService: PriceService) { }

    ngOnInit(): void {
      this.getPriceList()
  }
  setRefs(ref_assignto: string): void {
    this.ref_assignto = ref_assignto;
    this.getPriceList()
  }
  getPriceList(): void {
    if(IsEmpty(this.ref_assignto))
      return;
    this.priceService.getPriceList(this.ref_assignto)
    .subscribe(res => {
      let list = []
      for (let i = 0; i < res.length; i++) {
          var item = new PriceDM;
          item.readFromObj(res[i])
          list.push(item)
      }
      this.priceList = list;
    })
  }
  afterSaved(){
    this.closeModal()
    this.getPriceList()
  }
  closeModal(): void {
    this.modal.closeModal()
  }
  onSavePrice(): void {
    this.priceDetail.onSave()
  }
  onAdd(){
    this.modalTitle = "Add Price";
    this.modal.showModal()
    var data = new PriceDM()
    data.ref_assignto = this.ref_assignto;
    this.priceDetail.setData(data.clone())
  }

  onDelete(data: Price): void {
    this.priceService.deletePrice(data.ref_assignto, data.ref_price)
    .subscribe(res => {
      this.getPriceList()
    })
  }
}

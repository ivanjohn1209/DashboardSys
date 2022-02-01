import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Price, PriceDM } from 'src/app/interface/price';
import { PriceService } from 'src/app/service/price.service';

@Component({
  selector: 'price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css']
})
export class PriceDetailComponent implements OnInit {
  priceDetail: Price = new PriceDM()
  @Output() afterSave: EventEmitter<any> = new EventEmitter();

  constructor(private priceService:PriceService) { }

  ngOnInit(): void {
  }
  setData(data: PriceDM){
    this.priceDetail = data
  }
  onSave(){
    this.priceService.upsertPrice(this.priceDetail)
    .subscribe(res => {
      this.afterSave.emit()
      console.log(res)
    })
    
  }
}

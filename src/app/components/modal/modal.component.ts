import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string = "Modal Title";
  @Input() showFooter: boolean = true;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showModal(){
    this.show = true;
    // var div = document.createElement("div");
    // div.className = "modal-backdrop fade show"
    // document.body.appendChild(div)
  }
  closeModal(){
    this.show = false;
  }

  onSaveClick(): void {
    this.onSave.emit()
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection, InspectionType, StatusType } from 'src/app/interface/inspection.model';
import { InspectionService } from 'src/app/service/inspection.service';

@Component({
  selector: 'edit-inspection',
  templateUrl: './edit-inspection.component.html',
  styleUrls: ['./edit-inspection.component.css']
})
export class EditInspectionComponent implements OnInit {
  @Input() inspection?: Inspection;
  @Input()  
  public afterSubmit!: () => void;

  inspectionTypeList$!: Observable<InspectionType[]>;
  statusList$!: Observable<StatusType[]>;

  constructor(private inspectionService: InspectionService) { }

  ngOnInit(): void {
    this.getInspectionListType()
    this.getStatusList()
  }

  getInspectionListType(): void {
    this.inspectionTypeList$ = this.inspectionService.getInspectionTypeList()
  }

  getStatusList(): void {
    this.statusList$ = this.inspectionService.getStatusList()
  }

  onSubmit(): void {
    if(this.inspection?.id != null)
      this.inspectionService.updateInspection(this.inspection?.id, this.inspection)
      .subscribe(res => {
        this.afterSubmit()
      })
    else
      this.inspectionService.addInspection(this.inspection)
      .subscribe(res => {
        this.afterSubmit()
      })
  }

}

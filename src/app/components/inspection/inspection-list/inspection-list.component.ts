import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection, InspectionType } from 'src/app/interface/inspection.model';
import { InspectionService } from 'src/app/service/inspection.service';
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
  selector: 'inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {
  inspections$!: Observable<Inspection[]>;
  inspectionTypeList$!: Observable<InspectionType[]>;
  isShowInspectionTypes: boolean = false;
  showInspectionModal: boolean = false;
  inspectionTypesList:InspectionType[]=[];
  inspection?: Inspection;
  // Map to display data associate with foreign keys
  inspectionTypesMap:Map<number, string> = new Map();
  modalTitle?: string = "Add Inspection";
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  public afterSubmitInspection = this.afterSubmit.bind(this);

  constructor(private inspectionService: InspectionService) { }
  ngOnInit(): void {
    this.getList()
    this.getInspectionListType()
    this.refreshInspectionTypesMap();
  }

  getList(): void {
    this.inspections$ = this.inspectionService.getInspectionList()
  }
  getInspectionListType(): void {
    this.inspectionTypeList$ = this.inspectionService.getInspectionTypeList()
  }

  editItem(id: number|string): void {
    this.inspections$.subscribe((res) => {
      let data = res.find(x => x.id === id);
      if(data){
        this.inspection = data;
        this.modalTitle = "Edit Inspection";
        this.showInspectionModal = true;
      }
    })
    // var data = this.inspections$[id]
    // this.inspection = data;
    // this.modalTitle = "Edit Inspection";
    // this.showInspectionModal = true;
  }

  deleteItem(id: number): void {
    this.inspectionService.deleteInspection(id)
    .subscribe(() => this.getList());
  }
  toggleTypeModal(): void {
    console.log(this.inspectionTypeList$)
    this.isShowInspectionTypes = !this.isShowInspectionTypes;
  }
  refreshInspectionTypesMap() {
    this.inspectionService.getInspectionTypeList().subscribe(data => {
      this.inspectionTypesList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }
    })
  }

  modalAdd(): void{
    this.inspection = {
      id: null,
      status: '',
      comments: '',
      inspectionTypeId: 0
    }
    this.modalTitle = "Add Inspection";
    this.showInspectionModal = true;
  }
  closeInspectionModal(){
    this.showInspectionModal = false;
  }

  public afterSubmit(): void{
    this.closeInspectionModal()
    this.getList()
  }
}

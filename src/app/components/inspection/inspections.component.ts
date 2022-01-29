import { Component, OnInit } from '@angular/core';
import { Inspection } from 'src/app/interface/inspection.model';
import { InspectionService } from 'src/app/service/inspection.service';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  constructor(private inspectionService: InspectionService) { }
  ngOnInit(): void {
  }

  getList(): void{
  }

}

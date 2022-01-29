import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from 'src/app/service/files.service';
import { IsEmpty } from 'src/app/utility/ToolFtc';

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  @Input() ref_assignto: string = "";
  imageList: any[] = [];

  constructor(private fileService: FilesService) { }

  ngOnInit(): void {
    this.getFileList()
  }
  onAdd(): void {
  let file = document.querySelector("#attachment") as HTMLElement;
  file.click()
  }
  setRefs(ref_assignto: string){
    this.ref_assignto = ref_assignto;
    this.getFileList()
  }
  fileSelected(e: any): void {  
    let files = e.target.files as Array<object>;
    if(files.length > 0){
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        this.fileService.uploadFile(file, this.ref_assignto)
        .subscribe(res => {
          this.getFileList()
          console.log(res)
        })  
      }
    }
  }

  getFileList(){
    if(!IsEmpty(this.ref_assignto)){
      this.fileService.getFileList(this.ref_assignto)
      .subscribe(res => {
        this.imageList = res
      })  
    }
  }

  onDelete(img: any): void {
    this.fileService.deleteFile(img.ref_assignto, img.ref_file)
    .subscribe(res => {
      this.getFileList()
      console.log(res)
    })
  }
  
}

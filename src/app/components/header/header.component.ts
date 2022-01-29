import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  userName: string = "";
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.userName === ""){
      this.setValue()
  }
  }

  ngAfterContentInit(){
      if(this.userName === ""){
        this.setValue()
      }      
  }
  setValue(){
    this.authService.userData
    .subscribe(res => {
      this.userName = res.user_name;
    })
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onLogout(){
    this.router.navigateByUrl('login')
    localStorage.removeItem('key_token');

  }
}

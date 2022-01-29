import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InspectionApp';
  UserRef: string = "";
  constructor(private authService: AuthService, private router: Router){
  }
  ngOnInit(): void {
      this.getSessionInfo()
  }

  getSessionInfo(){
    this.authService.getSessionInfo()
    .subscribe({
      next: (v) => {
        this.authService.userData.next(JSON.parse(v.user_data))
        // this.router.navigateByUrl('/dashboard/home')
      },
      error: (e) => {
        this.router.navigateByUrl('/login')
        console.error(e)
      },
      complete: () => console.info('complete') 
  })
  }
}

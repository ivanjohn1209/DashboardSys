import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService,private router: Router ) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.authService.loginUser(this.email, this.password)
    .subscribe((res: any) => {
      localStorage.setItem('key_token', res?.token);
      this.authService.userData.next(JSON.parse(res.user_data))
      this.router.navigateByUrl('dashboard/home')
    })
  }

}

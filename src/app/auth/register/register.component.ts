import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_name: string = "";
  email: string = "";
  password: string = "";
  re_password: string = "";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    let { user_name, email, password, re_password } = this;
    if(re_password !== password)
      console.error("Password not match")
    else
      this.authService.registerUser(user_name, email, password)
      .subscribe((res: any) => {
        localStorage.setItem('key_token', res?.token);
        this.authService.userData.next(JSON.parse(res.user_data))
        this.router.navigateByUrl('dashboard/home')
      })
  }
}

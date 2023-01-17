import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})



export class LoginPage implements OnInit {

  
  formLogin!: FormGroup;
  
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.formLogin=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

 
  
  login(){
    
    this.userService.login(this.formLogin.value)
    .then(response=>{
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
    .catch(error=>console.log(error));
  
  }

  loginGoogle(){
    this.userService.loginWithGoogle()
    .then(response=>{
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
    .catch(error=> console.log(error))
  }
}

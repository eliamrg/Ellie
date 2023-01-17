import { Component, OnInit } from '@angular/core';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  name!: string;
  id!:string;
  formRegister!: FormGroup;
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {

    
    this.formRegister=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    })
  }


  setName($event: any) {
    this.name = $event.target.value;
  }

  register(){
    this.userService.register(this.formRegister.value)
    .then(response=>{
      console.log(response);

      let auth :any;
      auth= getAuth();
      updateProfile(auth.currentUser, {
        displayName:this.name
      })
      .then(() => {
        
        
        this.id=this.userService.getUserId()!;
        this.userService.SetUserFirestore(this.id,this.name).then(()=>{
          console.log('id:'+ this.id,this.name)
        this.router.navigate(['/settings']).then(() => {
          window.location.reload();
          });
        });
        


        })
      .catch(error=>console.log(error));
 
    })
    .catch(error=>console.log(error) )
  }


  loginGoogle(){
    this.userService.loginWithGoogle()
    .then(response=>{
      
      console.log(response);
      this.router.navigate(['/settings']).then(() => {
        window.location.reload();
        });
    })
    .catch(error=> console.log(error))
  }

}

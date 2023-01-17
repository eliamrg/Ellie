import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { ImageTransform } from 'ngx-image-cropper';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private userService:UserService, private router: Router,
              private loadingCtrl: LoadingController,
              private storageService: StorageService) { }

  

  UserInfo:any={
    user:'...',
    profilePicture:'',
    cover:'',
    displayName:'...',
    description:'...'
  };
  
  photoURL:any;


  email:any;
  verified=false;
  sentVerification=false;
  emailVerificationButtonText="Send verification link";
  isMobile=Capacitor.getPlatform()!=='web';
  myImage :any=null;
  croppedImage: any = '';
  transform: ImageTransform={}

   ngOnInit() {
    this.email=this.userService.getEmail();
    this.verified=this.userService.checkEmailVerified();
     this.userService.getFirestoreUser(this.userService.getUserId()).then(
      res=>{
        this.UserInfo=res;
        console.log(res);
      }
    );
  }

  changePictureState=0;
  aspectRatio=1/1;

changeProfilePicture(){
  this.changePictureState=1;
  this.aspectRatio=1/1;
   this.TakePhoto()
}


changeCoverPicture(){
  this.changePictureState=2;
  this.aspectRatio=2/1;
  this.TakePhoto()
}

  async TakePhoto(){
    try{
      const image=await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64
      });
      const loading=await this.loadingCtrl.create();
      await loading.present();
      this.myImage=`data:image/jpeg;base64,${image.base64String}`;
      this.croppedImage=null;

      
      //this.myImage=
      //return image.dataUrl;
      
    }
    catch(err){
      console.log("error tomar foto",err)
      //return false;
    }
  }

  goBack(){
    this.router.navigate(['/dashboard/profile']);
  }
  logOut(){

    this.userService.logout()
    .then(response=>{
      console.log(response);
      this.router.navigate(['/login']);
    })
    .catch(error=>console.log(error) )
  }
  verifyEmail(){
    this.userService.sendVerificationEmail().
    then(reponse=>{
      console.log(reponse);
      this.sentVerification=true;
      this.emailVerificationButtonText="Send Again";
    });
  }


  
  

    
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        this.loadingCtrl.dismiss();
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    acceptPicture(){

      if(this.changePictureState==1){
        this.UserInfo.profilePicture=this.croppedImage;
        this.storageService.uploadProfilePicture(this.userService.getUserId(),this.croppedImage);
        this.myImage=null;
      }
      else if(this.changePictureState==2){
        this.UserInfo.cover=this.croppedImage;
        this.storageService.uploadCoverPicture(this.userService.getUserId(),this.croppedImage);
        this.myImage=null;
      }
      
    }
    dismissPicture(){
      this.myImage=null;
    }

    rotate(){
      const newValue=((this.transform.rotate ?? 0)+ 90) % 360;
      this.transform={
        ...this.transform,
        rotate:newValue
      };
    }

    flipHorizontal(){
      this.transform={
        ...this.transform,
        flipH:!this.transform.flipH
      };
    }

    flipVertical(){
      this.transform={
        ...this.transform,
        flipV:!this.transform.flipV
      };
    }
}

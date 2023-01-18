import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  
  constructor(private posts: PostService,
              private loadingCtrl: LoadingController,
              private storageService:StorageService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
      
  }

  picture:any=null;
  imageAccepted = false;
  caption="";
  croppedImage: any = null;
  transform: ImageTransform={}
  isMobile=Capacitor.getPlatform()!=='web';
  
  async createPost(){
    const loading=await this.loadingCtrl.create();
    await loading.present();
    let date = new Date().valueOf().toString();
    this.storageService.uploadPostPicture(date,this.croppedImage).then(photoUrl=>{
      
      this.posts.createPost(date,this.caption,photoUrl).then(()=>{
        this.loadingCtrl.dismiss();
        this.presentAlert();
      });
    });
    
  }

  async takePhoto(){
    this.transform={}
    this.imageAccepted=false;
    try{
      const image=await Camera.getPhoto({
        quality:90,
        allowEditing:true,
        resultType:CameraResultType.Base64
      });
      const loading=await this.loadingCtrl.create();
      await loading.present();
      this.picture=`data:image/jpeg;base64,${image.base64String}`;
      this.croppedImage=null;
      
    }catch(err){console.log("error tomar foto",err)}
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
  acceptPicture(){

    this.imageAccepted=true;
    this.picture=null;
    
  }
  dismissPicture(){
    this.imageAccepted=false;
    this.picture=null;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Posted!',
      backdropDismiss:false,
      buttons: [ {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['/dashboard/home']).then(() => {
            window.location.reload();
          });
        },
      },],
    });

    await alert.present();
  }



}

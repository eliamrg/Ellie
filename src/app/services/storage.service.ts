import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, uploadString } from '@angular/fire/storage';
import { getDownloadURL } from '@firebase/storage';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage,
              private userService:UserService) { }


  uploadProfilePicture(userID:any, image:any){
    const imageRef=ref(this.storage,`ProfilePictures/${userID}`);
    uploadString(imageRef,image,'data_url')
    .then(Response=>{
      getDownloadURL(imageRef).then(URL=>{
        this.userService.updateProfilePicture(userID,URL);
      })
    });
  }



  async uploadPostPicture(postId:any,image:any){
    const imageRef=ref(this.storage,`Posts/${postId}`);
    let url
    await uploadString(imageRef,image,'data_url')
    .then(async ()=>{
      await getDownloadURL(imageRef).then(URL=>{
        url=URL;
      })
    });
    console.log(url);
    return url;

  }


  uploadCoverPicture(userID:any, image:any){
    const imageRef=ref(this.storage,`CoverPictures/${userID}`);
    uploadString(imageRef,image,'data_url')
    .then(Response=>{
      getDownloadURL(imageRef).then(URL=>{
        this.userService.updateCoverPicture(userID,URL);
      })
    });
  }

  getImage(folder:any,name:any){
    const imageRef=ref(this.storage,`${folder}/${name}`);
    getDownloadURL(imageRef).then(url=>{
      return url;
    });
  }

}

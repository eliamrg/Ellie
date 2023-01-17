import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  picture: string | undefined;

  constructor(private posts: PostService,private user: UserService) { }

  ngOnInit() {
      
  }

  createPost(){
    this.posts.createPost(this.user.getUserId());
  }

  async takePhoto(){
    try{
      const image=await Camera.getPhoto({
        quality:90,
        allowEditing:true,
        resultType:CameraResultType.DataUrl
      });
      this.picture=image.dataUrl;
    }catch(err){console.log("error tomar foto",err)}
  }

}

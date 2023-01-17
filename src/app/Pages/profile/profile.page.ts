import { Component, OnInit } from '@angular/core';
import User  from '../../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private userService:UserService) {
    
   }

  userName:any;
  photoURL:any;
  UserInfo:any={
    user:'...',
    profilePicture:'',
    cover:'../../../assets/cover.jpg',
    displayName:'...',
    description:''
  };
  
   

  
  ngOnInit() {
    this.userService.getFirestoreUser(this.userService.getUserId()).then(
      res=>{
        this.UserInfo=res;
        console.log(res);
      }
    );
    /*
    this.userName=this.userService.getUserName();
    this.photoURL=this.userService.getUserPic();*/
  }

   myPosts: string[] = [
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
    'https://cdn.wallpapersafari.com/65/80/Jd3Ep5.jpg',
    'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-rPob2-aUXp6hxmrmDYqAcd_YFcPEPLP_KSlgeiigHM4TZdKUgz5t8bY4gAeTz9yErEU&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2hWDH1n8qcBSyfaHwjhpZiiqN0xtRVvHzUjaQBUtEAb1CSSpH6id4pYslRU4THY7xDw&usqp=CAU',
    'https://i1.sndcdn.com/artworks-000204735105-v7u4bd-t500x500.jpg',
    'https://preview.redd.it/qks6c12552i41.png?auto=webp&s=a593ed5115f68435cef0873f56b915fc5539b8fc'
  ];
  friendsPosts: string[] = [
    'https://images.unsplash.com/photo-1605749439419-80c81f67eefc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VycyUyMGFlc3RoZXRpY3xlbnwwfHwwfHw%3D&w=1000&q=80', 
    'https://images.unsplash.com/photo-1619045119136-349759036541?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwYWVzdGhldGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
    'https://images.unsplash.com/photo-1609171712489-45b6ba7051a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0JTIwYWVzdGhldGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://m.media-amazon.com/images/I/81PsiI8Be+L.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHRWylimfTOykw5j2G7zkIqr1TOQpTiHpUw&usqp=CAU'
  ];

  goToImage(image:string){
    console.log(image);
    window.location.href = image;
  }

  visiblePosts:any="myPosts";
  segmentChanged(event:any){
    console.log(event.target.value);
    this.visiblePosts=event.target.value;

  }
}




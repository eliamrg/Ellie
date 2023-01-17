import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore:Firestore, private userService: UserService) { }
  


  async createPost(postID:any,caption:any,picture:any){
    

    let Userid=this.userService.getUserId();

    await setDoc(doc(this.firestore, "Posts", postID), {
      user:Userid,
      caption:caption,
      picture:picture,
      likes:0,
      likesList:[],
      coments:[]
    },{merge:true}).then(()=>console.log("Post Created"));
  }

  getPosts(){
    return onSnapshot(collection(this.firestore, "Posts"), (querySnapshot) => {
       
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });   
    });
  }



}

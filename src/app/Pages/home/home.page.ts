import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { collection,startAfter,orderBy, doc, DocumentData, Firestore, getDocs, limit, onSnapshot, query, setDoc, Timestamp, where } from '@angular/fire/firestore';

//import logo from '../../../assets/Ellie icon.png'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private userService:UserService,
              private postsService: PostService,
              private firestore:Firestore) { }
  ngOnInit() {
      
      this.userName=this.userService.getUserName();
    }
  userName:any;

  posts:any=[ ]

  unsubscribe=this.getPosts();
  

  private generateItems() {
    console.log(this.snapshot)
  }
  
  onIonInfinite(ev:any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  };

  q:any;
  snapshot:any

 
  async getPosts(){
    this.q = query(collection(this.firestore, "Posts"),orderBy("date","desc"), limit(1));
    this.snapshot= onSnapshot(this.q, (querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
        let post=doc.data()
        this.userService.getUserById(post["user"]).then(user=>{
          if (user!=null){
            post["id"]=doc.id;
            post["profilePicture"]=user["profilePicture"]
            post["userName"]=user["displayName"]
            let date=(post["date"] as Timestamp)
            post["date"]= date.toDate().toLocaleString();
            
            this.posts.push(post);
          }
        })
      });   
    });
  }
}

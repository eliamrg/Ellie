import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { collection,endBefore,startAfter,startAt,orderBy, doc, DocumentData, Firestore, getDocs, limit, onSnapshot, query, setDoc, Timestamp, where } from '@angular/fire/firestore';



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
  firstquery=true;
  unsubscribe=this.getPosts();
  endReached=false;
  latestDoc:any=null;
  
  
  onIonInfinite(ev:any) {
    this.getPosts();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 5000);
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  };

  
 
  
 
  
 
  async getPosts(){
    try{

      let q;
      
      if(this.firstquery){
         q= query(collection(this.firestore, "Posts"),orderBy("date","desc"), limit(10));
        this.firstquery=false
      }
      else{
         q= query(collection(this.firestore, "Posts"),orderBy("date","desc"),startAfter(this.latestDoc), limit(10));
      }
      
      const documentSnapshots =await getDocs(q)
        documentSnapshots.forEach((doc:any)=>{
          
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
        })
        this.latestDoc=documentSnapshots.docs[documentSnapshots.docs.length-1];
    }
    catch(err){
      this.endReached=true;
      
    }
    

    /*
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
    });*/
  }
}

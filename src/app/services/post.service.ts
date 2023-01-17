import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore:Firestore) { }
  xd:string="s";
  async createPost(Userid:any){
    const date = new Date();

    await setDoc(doc(this.firestore, "Posts", date.valueOf().toString()), {
      user:Userid,
      caption:"hola",
      picture:"https://images.unsplash.com/photo-1609171712489-45b6ba7051a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0JTIwYWVzdGhldGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      likes:0,
      dislikes:0,
      coments:["hola","buena foto","genial"]
    },{merge:true}).then(()=>console.log("datos subidos"));
  }

   getPosts(){
    return onSnapshot(collection(this.firestore, "Posts"), (querySnapshot) => {
       
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });   
});
    
    
    /*
    const querySnapshot =  getDocs(collection(this.firestore, "Posts"));
    (await querySnapshot).forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    */


    /*
    const unsub = onSnapshot(doc(this.firestore, "Posts", Userid), (doc) => {
      console.log("Current data: ", doc.data());
  }); 
  */
    
  }
}

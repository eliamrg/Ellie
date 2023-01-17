import { Injectable } from '@angular/core';
import { Auth, getAuth, sendEmailVerification } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, setDoc, doc, getDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore:Firestore,private router:Router) { }

  register({email,password}:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword (this.auth,email,password);
  }

  logout(){
    return signOut(this.auth);
  }

  async loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider).then(
      async ()=>{
        if(await this.getFirestoreUser(this.getUserId())==false){
          
          this.SetUserFirestore(this.getUserId(),this.getUserName()).then(()=>"Registrado");
        }
      }
    );
  }

  getUserId(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      return uid;
    }
    else{
      return null;
    }
  }
  getEmail(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      
      return user.email;
    }
    else{
      return null;
    }
  }

   async sendVerificationEmail() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      console.log('s')
      sendEmailVerification(user);
      return true;
    }
    else{
      return false;
    }
    
    
}

  checkEmailVerified(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.emailVerified;
    }
    else{
      return false;
    }
  }

  redirectEmailVerified(){
    if(this.checkEmailVerified()){
      this.router.navigate(['/dashboard/settings']);
    };
  }

  getUserName(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const name = user.displayName;
      return name;
    }
    else{
      return null;
    }
  }


  getRandomNumber(min:number, max:number) {
  const floatRandom = Math.random()
  const difference = max - min
  // random between 0 and the difference
  const random = Math.round(difference * floatRandom)
  const randomWithinRange = random + min
  return randomWithinRange
  }

  async checkIfUserExists(user:any){

    let found=false;

    const q = query(collection(this.firestore, "Users"), where("user", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      found= true;
    });
    return found;
  }

  getUserPic(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const pic = user.photoURL;
      return pic;
    }
    else{
      return null;
    }
  }

  async SetUserFirestore(id:any,name:any){
    

    let user:any=name+this.getRandomNumber(0,999999);
    console.log(user);
     await this.checkIfUserExists(name).then(async res=>{
      console.log(name+"Exists",res);
      
      if(res==true){
        user=user+this.getRandomNumber(0,999999);
        await setDoc(doc(this.firestore, "Users", id), {
          user:user.replace(" ","_"),
          displayName: name,
          profilePicture: "https://ionicframework.com/docs/img/demos/avatar.svg",
          cover: "https://amdmediccentar.rs/wp-content/plugins/uix-page-builder/includes/uixpbform/images/default-cover-6.jpg",
          description: ""
        });
      }
      else{
        await setDoc(doc(this.firestore, "Users", id), {
          user:user.replace(" ","_"),
          displayName: name,
          profilePicture: "https://ionicframework.com/docs/img/demos/avatar.svg",
          cover: "https://amdmediccentar.rs/wp-content/plugins/uix-page-builder/includes/uixpbform/images/default-cover-6.jpg",
          description: ""
        });
      }
    })  
  }

  updateProfilePicture(id:any,url:any){
    setDoc(doc(this.firestore, "Users", id),{profilePicture:url},{merge:true})
  }
  updateCoverPicture(id:any,url:any){
    setDoc(doc(this.firestore, "Users", id),{cover:url},{merge:true})
  }

  async getFirestoreUser(id:any){

    const userConverter = {
        toFirestore: (user: { user: any; displayName: any; cover: any; profilePicture: any; }) => {
            return {
              user: user.user, 
              displayName: user.displayName,
                cover: user.cover,
                profilePicture: user.profilePicture
                };
        },
        fromFirestore: (snapshot:any, options:any) => {
            const data = snapshot.data(options);
            return new user(data.user,data.displayName, data.cover, data.profilePicture,data.description);
        }
    };

    const ref = doc(this.firestore, "Users", id).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to user object
      const user = docSnap.data();
      // Use a user instance method
      //console.log(user.toString());

      return user;
    } else {
      console.log("No such document!");
      return false;
    } 
  }
}



class user {
  user: any;
  displayName: string;
  cover: string;
  profilePicture: any;
  description: any;
  constructor (user:any,displayName: any, cover: any, profilePicture: any,description:any ) {
    this.user=user;  
    this.displayName = displayName;
    this.cover = cover;
    this.profilePicture = profilePicture;
    this.description=description;
  }
  toString() {
      return this.user+', '+this.displayName + ', ' + this.cover + ', ' + this.profilePicture;
  }
}



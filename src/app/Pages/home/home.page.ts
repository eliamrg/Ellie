import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
//import logo from '../../../assets/Ellie icon.png'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  

  constructor(private userService:UserService) { }

  userName:any;

  posts=[
    {
      userImage:'../../../assets/icon circle.png',
      userName:this.userService.getUserName(),
      caption:'Nada como la lluvia y un buen libro 👌🏻👌🏻🔥',
      postImage:'https://images.pexels.com/photos/3640930/pexels-photo-3640930.jpeg?cs=srgb&dl=pexels-ena-marinkovic-3640930.jpg&fm=jpg',
    }
  ]


  
  ngOnInit() {

    
    this.userName=this.userService.getUserName();
  }


  private generateItems() {
    let newPost:any;
    newPost=
      {
      userImage:'../../../assets/icon circle.png',
      userName:this.userService.getUserName(),
      caption:'Hello',
      postImage:'https://lh3.googleusercontent.com/hwau7OVWx96XaME5KpRuJ0I_MscrerK6SbRH1UwYHYaxIDQQtn7RZK02LDSfBzCreidFgDsJeXyqDct6EZiH6vsV=w640-h400-e365-rj-sc0x00ffffff',
    };
    
    this.posts.push(newPost);
    newPost=
      {
      userImage:'../../../assets/icon circle.png',
      userName:this.userService.getUserName(),
      caption:'Bye',
      postImage:'https://img.freepik.com/vector-premium/adios-bandera-grahpic-antigua-bandera-moda-vintage-texto-bye-bye-bandera-vintage-bandera-cinta-grahpic-dibujado-mano_136321-1593.jpg?w=2000',
    };
    this.posts.push(newPost);
    newPost=
      {
      userImage:'../../../assets/icon circle.png',
      userName:this.userService.getUserName(),
      caption:'Estas en un ciclo del que no vas a salir:)',
      postImage:'https://images.squarespace-cdn.com/content/v1/621d3bdf0f7c7c414579182f/5adb17f6-2e30-451a-b5c3-7ecf2fc3640a/WeAreTheLoopBannerSmall.png',
    };
    this.posts.push(newPost);
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

}

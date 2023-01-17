import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chat(){
    window.location.href="dashboard/conversations/chat";
  }
}

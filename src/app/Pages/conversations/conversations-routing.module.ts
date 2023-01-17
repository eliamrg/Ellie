import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsPage } from './conversations.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationsPage
  },
  {
    path: 'chat',
    loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationsPageRoutingModule {}

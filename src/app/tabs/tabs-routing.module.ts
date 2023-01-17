import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsPage } from '../Pages/conversations/conversations.page';
import { TabsPage } from './tabs.page';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: TabsPage,
    children: [
      
      {
        path: 'home',
        loadChildren: () => import('../Pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../Pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      
      
      {
        path: 'notifications',
        loadChildren: () => import('../Pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'createPost',
        loadChildren: () => import('../Pages/create-post/create-post.module').then( m => m.CreatePostPageModule)
      },
      
      {
        path: 'settings',
        loadChildren: () => import('../Pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full'
      }
    ],
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

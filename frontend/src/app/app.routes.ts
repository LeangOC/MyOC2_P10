import { Routes } from '@angular/router';

import { LoginComponent }
  from './auth/login.component';

import { ChatComponent }
  from './chat/chat.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'chat',
    component: ChatComponent
  }

];

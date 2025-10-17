import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProcessFlow } from './workflow/process-flow/process-flow';
import { Settings } from './settings/settings';
import { UserSetting } from './settings/user-setting/user-setting';

import { ChangePassword } from './change-password/change-password';
import { RoomSetting } from './settings/room-setting/room-setting';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'processflow', component: ProcessFlow },
  { path: 'settings', component: Settings },
  { path: 'usersetting', component: UserSetting } ,
  {path: 'roomsetting', component:RoomSetting},
  { path: 'changePassword', component: ChangePassword } 
];


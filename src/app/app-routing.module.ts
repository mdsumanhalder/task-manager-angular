import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: TaskListComponent,
    // canActivate: [AuthGuardService],  // commented propertity used to make the auth gurad implementation basen on roles
    // data: { expectedRole: 'Employee' },
  },
  // { path: 'notifications', component: NotificationListComponent },
  // { path: 'analytics', component: AnalyticsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

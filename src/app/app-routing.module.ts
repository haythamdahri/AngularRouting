import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers', /*canActivate: [AuthGuard]*/
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard], resolve: {server: ServerResolver}} // Setup the route resolver to fetch data dynamically for each call
    ]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {errorMessage: 'An error occurred, page not found!'}}, // message will be catched from the ErrorPageComponent through the injected activatedRoute
  {path: '**', redirectTo: '/not-found'} // This generic route must be the last one to prevent redirection what ever the path
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, /*{useHash: true}*/) //useHash is used to resolve issues on the deployment server if angular can not take the action on a route
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

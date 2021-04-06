// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent, RegisterComponent } from '@auth/components';
import { CurrenciesTableComponent, HomeComponent, NavigationComponent } from '@core/components';
import { ProfilePageComponent } from '@profile/components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    component: NavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'markets',
        component: CurrenciesTableComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ]
  }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

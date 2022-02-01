import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InspectionListComponent } from './components/inspection/inspection-list/inspection-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      {
        path:"home",
        component: HomeComponent
      },
      {
        path:"inspection",
        component: InspectionListComponent
      },
      {
        path:"product",
        component: ProductListComponent
      },
      {
        path:"service",
        component: ServiceListComponent
      },
      {
        path:"settings",
        component: SettingsComponent
      }
    ] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

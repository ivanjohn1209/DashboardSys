import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InspectionsComponent } from './components/inspection/inspections.component';
import { HttpClientModule } from '@angular/common/http';
import { EditInspectionComponent } from './components/inspection/edit-inspection/edit-inspection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InspectionListComponent } from './components/inspection/inspection-list/inspection-list.component';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from "@angular/material/card"
import {MatTableModule} from '@angular/material/table';

import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { PriceTableComponent } from './components/price-table/price-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { PriceDetailComponent } from './components/price-detail/price-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
@NgModule({
  declarations: [
    AppComponent,
    InspectionsComponent,
    EditInspectionComponent,
    InspectionListComponent,
    HomeComponent,
    SideNavComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ServiceListComponent,
    ProductListComponent,
    ProductDetailComponent,
    ServiceDetailComponent,
    ImageGalleryComponent,
    PriceTableComponent,
    ModalComponent,
    PriceDetailComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

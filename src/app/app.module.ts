import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './Shared/material.module';
import {EmployeeComponent} from './Components/employee/employee.component';
import { DepartmentComponent, DialogComponent} from './Components/department/department.component';
import { HomeComponent } from './Components/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee',      component: EmployeeComponent },
  { path: 'department',      component: DepartmentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    HomeComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [

  ],
  bootstrap: [AppComponent],

  entryComponents: [DialogComponent]
})
export class AppModule { }

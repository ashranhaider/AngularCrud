import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {MatCardModule, MatMenuModule, MatIconModule
  ,MatButtonModule, MatToolbarModule,MatSidenavModule,MatInputModule ,
  MatCheckboxModule,MatListModule, MatDialogModule, MatOptionModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
  import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EmployeeComponent} from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
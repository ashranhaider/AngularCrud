import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSort, MatTableDataSource, MatPaginator, MatTable, MatSnackBar ,
   MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Department} from '../Models/Departments';
import {DepartmentsServiceService} from '../Services/departments-service.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  departments: Department[];

  displayedColumns: string[] = ['ID', 'Name', 'Location', 'actions'];
  dataSource: MatTableDataSource<Department>;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  locationFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Department>;

  constructor(private departmentService: DepartmentsServiceService, private changeDetectorRefs: ChangeDetectorRef,
              public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeDepartmentsDataTable();
  }

  initializeDepartmentsDataTable(): void {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;

      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  saveDepartment(): void {

    const department = new Department();
    department.Name = this.nameFormControl.value;
    department.Location = this.locationFormControl.value;

    this.departmentService.saveDepartment(department).subscribe(dep => {
      this.departments.push(dep);
      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();
      this.snackBar.open('Department Saved!', 'Ok', {
        duration: 2000,
      });
    });
  }

  showthat(d: Department): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: d
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
//////////////////////////////////////////////////////////////////

// Dialog component

@Component({
  selector: 'app-dialog',
  template: `
  <h1 mat-dialog-title style="align:center">Update Department</h1>
  <div mat-dialog-content>
    <b>Enter Department Name.</b>
    <br/>
    <mat-form-field>
      <input style='width:100%' matInput [(ngModel)]="departmentData.Name">
    </mat-form-field>
    <br/>
    <b>Enter Department Location.</b>
    <br/>

    <mat-form-field>
      <input style='width:100%' matInput [(ngModel)]="departmentData.Location">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-stroked-button (click)="onNoClick()">Update this shit</button>
  </div>
  `,
})
export class DialogComponent {

  constructor(
    public departmentService: DepartmentsServiceService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public departmentData: Department, public snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.departmentService.updateDepartment(this.departmentData).subscribe(x => {
      this.snackBar.open('Department ' + this.departmentData.Name.toString() + ' updated successfully.', 'Ok', {
          duration: 4000,
        });
    });
    this.dialogRef.close();
  }

}

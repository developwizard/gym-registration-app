import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {User} from "../models/user.model";
import {ApiService} from "../services/api.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterModule} from "@angular/router";
import {NgConfirmModule, NgConfirmService} from "ng-confirm-box";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgConfirmModule,
    NgToastModule,
    RouterModule
  ]
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action'
  ];

  constructor(private api: ApiService,
              private ngConfirmService: NgConfirmService,
              private router: Router,
              private toastService: NgToastService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegisteredUsers()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditClick(id: number) {
    this.router.navigate(['update', id]);
  }

  onDelete(id: number) {
    this.ngConfirmService.showConfirm("Are you sure want to delete?",
      () => {
        this.api.deleteRegisteredUser(id).subscribe(_ => {
          this.toastService.success({detail: 'Success', summary: 'Deleted Successfully', duration: 3000});
          this.getUsers();
        });
      },
      () => {

      });
  }
}

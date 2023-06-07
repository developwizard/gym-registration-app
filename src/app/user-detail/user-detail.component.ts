import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {CommonModule} from "@angular/common";
import {User} from "../models/user.model";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    RouterModule
  ]
})
export class UserDetailComponent implements OnInit {
  public userId!: number;
  userDetail!: User;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.userId = params['id'];
      this.fetchUserDetails();
    });
  }

  fetchUserDetails() {
    this.api.getRegisteredUserById(this.userId)
      .subscribe(user => {
        this.userDetail = user;
      });
  }
}

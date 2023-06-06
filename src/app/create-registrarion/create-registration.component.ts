import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ApiService} from "../services/api.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    NgToastModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CreateRegistrationComponent implements OnInit {
  packages = ["Monthly", "Quarterly", "Yearly"];
  genders = ["Male", "Female"];
  importantList: string[] = [
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ];
  registrationForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router,
              private toastService: NgToastService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']
    });

    this.registrationForm.controls['height'].valueChanges
      .subscribe(height => {
        this.calculateBmi(height);
      });

    this.activatedRoute.params.subscribe(params => {
      this.userIdToUpdate = params['id'];
      this.apiService.getRegisteredUserById(this.userIdToUpdate)
        .subscribe(user => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(user);
        });
    });
  }

  onSubmit() {
    this.apiService.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({detail: "Success", summary: "Enquiry Added", duration: 3000});
        this.registrationForm.reset();
      });
  }

  calculateBmi(height: number) {
    const weight = this.registrationForm.value.weight;
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case bmi > 25 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    });
  }

  onUpdate() {
    this.apiService.updateRegisteredUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({detail: "Success", summary: "Enquiry Updated", duration: 3000});
        this.registrationForm.reset();
        this.router.navigate(['list']);
      });
  }
}

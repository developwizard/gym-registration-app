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

@Component({
  selector: 'app-create-registrarion',
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
    ReactiveFormsModule
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

  constructor(private fb: FormBuilder) {
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

    this.registrationForm.controls['height'].valueChanges.subscribe(height => {
      this.calculateBmi(height);
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  calculateBmi(height: number) {
    const weight = this.registrationForm.value.weight;
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch(true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case bmi >25 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }
}

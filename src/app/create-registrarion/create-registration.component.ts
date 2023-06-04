import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-create-registrarion',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class CreateRegistrationComponent {
  public packages = ["Monthly", "Quarterly", "Yearly"];
  public genders = ["Male", "Female"];
  public importantList: string[] = [
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ];
}

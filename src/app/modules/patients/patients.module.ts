import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AddEditPatientComponent } from './add-edit-patient/add-edit-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientsComponent, AddEditPatientComponent],
  imports: [
    PatientsRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PatientsModule {}

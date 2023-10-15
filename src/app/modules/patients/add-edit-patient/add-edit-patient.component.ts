import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientsService } from '@patients/patients.service';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.scss'],
})
export class AddEditPatientComponent implements OnInit {
  patientForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.min(0),
      Validators.max(100),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{1,2}$/),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: string },
    private patientsService: PatientsService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.data.id) {
      const patient = await this.patientsService.findOne(this.data.id);
      this.patientForm.setValue({
        name: patient.name,
        age: patient.age.toString(),
      });
    }
  }

  async update(): Promise<void> {
    if (this.patientForm.valid) {
      const values = this.patientForm.value;
      await this.patientsService.update(this.data.id!, {
        name: values.name!,
        age: +values.age!,
      });
      this.dialogRef.close();
    }
  }

  async create(): Promise<void> {
    if (this.patientForm.valid) {
      const values = this.patientForm.value;
      await this.patientsService.create({
        name: values.name!,
        age: +values.age!,
      });
      this.dialogRef.close();
    }
  }
}

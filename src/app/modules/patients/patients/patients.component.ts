import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPatientComponent } from '@patients/add-edit-patient/add-edit-patient.component';
import { Patient } from '@patients/models/patient.interface';
import { PatientsService } from '@patients/patients.service';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns = ['name', 'age', 'update', 'remove'];

  constructor(
    private patientsService: PatientsService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.patients = await this.patientsService.findAll();
  }

  openAddEditDialog(id?: string) {
    const dialogRef = this.dialog.open(AddEditPatientComponent, {
      width: '500px',
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.patients = await this.patientsService.findAll();
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        cascade: true,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.patientsService.remove(id);
        this.patients = await this.patientsService.findAll();
      }
    });
  }
}

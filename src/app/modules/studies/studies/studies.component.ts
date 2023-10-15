import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@patients/models/patient.interface';
import { PatientsService } from '@patients/patients.service';
import { DeleteDialogComponent } from '@shared/delete-dialog/delete-dialog.component';
import { AddStudyComponent } from '@studies/add-study/add-study.component';
import { Study } from '@studies/models/study.interface';
import { StudiesService } from '@studies/studies.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements OnInit {
  patient: Patient | null = null;
  studies: Study[] = [];
  displayedColumns = [
    'createdOn',
    'executiveFunction',
    'sensoryProcessing',
    'repetitiveBehaviours',
    'motorSkills',
    'perseverativeThinking',
    'socialAwareness',
    'verbalNoVerbalCommunication',
    'informationProcessing',
    'remove',
  ];

  constructor(
    private patientsService: PatientsService,
    private studiesService: StudiesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const patientId = this.route.snapshot.params['patientId'];
      this.patient = await this.patientsService.findOne(patientId);
      this.studies = await this.studiesService.findAll(patientId);
    } catch {
      this.router.navigate(['/']);
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddStudyComponent, {
      width: '500px',
      data: {
        patientId: this.patient!.id,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.studies = await this.studiesService.findAll(this.patient!.id);
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        cascade: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.studiesService.remove(this.patient!.id, id);
        this.studies = await this.studiesService.findAll(this.patient!.id);
      }
    });
  }
}

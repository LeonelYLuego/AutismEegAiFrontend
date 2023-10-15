import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudiesService } from '@studies/studies.service';

@Component({
  selector: 'app-add-study',
  templateUrl: './add-study.component.html',
  styleUrls: ['./add-study.component.scss'],
})
export class AddStudyComponent {
  files: {
    [key: string]: File | undefined;
  } = {};
  loading = false;

  wavesForm = new FormGroup({
    delta: new FormControl(null, [Validators.required]),
    theta: new FormControl(null, [Validators.required]),
    alfa: new FormControl(null, [Validators.required]),
    beta: new FormControl(null, [Validators.required]),
    gamma: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddStudyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string },
    private studiesService: StudiesService
  ) {}

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files[controlName] = input.files[0];
    } else {
      this.files[controlName] = undefined;
    }
  }

  async create(): Promise<void> {
    if (this.wavesForm.valid) {
      const formData = new FormData();
      Object.keys(this.files).map((wave) => {
        formData.append(wave, this.files[wave]!);
      });
      this.loading = true;
      await this.studiesService.create(this.data.patientId, formData);
      this.dialogRef.close();
    }
  }
}

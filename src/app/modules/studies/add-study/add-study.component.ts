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
  study: File | undefined;
  loading = false;

  wavesForm = new FormGroup({
    study: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddStudyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string },
    private studiesService: StudiesService
  ) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) this.study = input.files[0];
    else this.study = undefined;
  }

  async create(): Promise<void> {
    if (this.wavesForm.valid) {
      const formData = new FormData();
      formData.append('study', this.study!);
      this.loading = true;
      await this.studiesService.create(this.data.patientId, formData);
      this.dialogRef.close();
    }
  }
}

import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderModel } from '../../utils/models/provider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-provider',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-provider.component.html',
  styleUrl: './update-provider.component.css',
})
export class UpdateProviderComponent {
  providerForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProviderModel,
    private formBuilder: FormBuilder
  ) {
    this.providerForm = this.formBuilder.group({
      id: [data.id],
      legalName: [data.legalName, Validators.required],
      tradeName: [data.tradeName],
      taxId: [data.taxId],
      phoneNumber: [data.phoneNumber],
      email: [data.email, [Validators.required, Validators.email]],
      website: [data.website],
      physicalAddress: [data.physicalAddress],
      country: [data.country],
      annualRevenueUSD: [data.annualRevenueUSD],
      lastEdited: [data.lastEdited],
    });
  }

  updateProvider(): void {
    if (this.providerForm.valid) {
      const updatedProvider: ProviderModel = this.providerForm.value;
      this.dialogRef.close(updatedProvider);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

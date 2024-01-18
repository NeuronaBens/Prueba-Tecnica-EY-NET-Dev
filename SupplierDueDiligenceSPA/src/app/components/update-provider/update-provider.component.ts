import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ProviderModel } from '../../utils/models/provider';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-provider',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
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
      legalName: [
        {
          value: data.legalName,
          disabled: true,
        },
      ],
      tradeName: [data.tradeName],
      taxId: [data.taxId, Validators.pattern(/^\d{11}$/)],
      phoneNumber: [data.phoneNumber, Validators.pattern(/^\d+$/)],
      email: [data.email],
      website: [data.website],
      physicalAddress: [data.physicalAddress],
      country: [data.country],
      annualRevenueUSD: [data.annualRevenueUSD],
      lastEdited: [data.lastEdited],
    });
  }

  updateProvider(): void {
    if (this.providerForm.valid) {
      // Get the value of legalName from the form
      const legalNameValue = this.providerForm.controls['legalName'].value;

      // Get the rest of the form values
      const updatedProvider: ProviderModel = {
        ...this.providerForm.value,
        legalName: legalNameValue,
      };

      console.log(updatedProvider);
      this.dialogRef.close(updatedProvider);
    } else {
      alert(
        'Please fill in all required fields and ensure they are correctly formatted.'
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderModel } from '../../utils/models/provider';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.css',
})
export class ProviderDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProviderModel) {}
}

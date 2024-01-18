import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HighRiskListService } from '../../utils/services/high-risk-list.service';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreeningService } from '../../utils/services/screening.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-screening-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './screening-dialog.component.html',
  styleUrl: './screening-dialog.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ScreeningDialogComponent {
  providerId: number;
  highRiskLists: any[] = [];
  selectedLists: any[] = [];
  screeningResult: { isHighRisk: boolean } | null = null;

  constructor(
    public dialogRef: MatDialogRef<ScreeningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private highRiskListService: HighRiskListService,
    private screeningService: ScreeningService
  ) {
    this.providerId = data.providerId;

    // Fetch high-risk lists
    this.highRiskListService.getHighRiskLists().subscribe((lists) => {
      this.highRiskLists = lists;
    });
  }

  performScreening() {
    // Check if at least one checkbox is selected
    const selectedLists = this.highRiskLists.filter((list) => list.checked);

    if (selectedLists.length === 0) {
      console.error('Please select at least one High Risk List for screening.');
      return;
    }

    // Limit the selection to three lists
    const selectedListsLimited = selectedLists.slice(0, 3);

    console.log('Performing screening for Provider ID:', this.providerId);
    console.log('Selected High Risk Lists:', selectedListsLimited);

    this.screeningService
      .isProviderOnHighRiskLists(
        this.providerId,
        selectedListsLimited.map((list) => list.id)
      )
      .subscribe((result) => {
        this.updateResultTable(result);
      });
  }

  updateResultTable(result: any) {
    this.screeningResult = {
      isHighRisk: result.IsOnHighRiskLists,
    };
  }
  cancel() {
    this.dialogRef.close();
  }
}

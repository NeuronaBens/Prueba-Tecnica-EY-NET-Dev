import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HighRiskListService } from '../../utils/services/high-risk-list.service';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreeningService } from '../../utils/services/screening.service';

@Component({
  selector: 'app-screening-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.highRiskListService.getHighRiskLists().then((lists) => {
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

    // Implement logic to perform screening with selectedLists and providerId
    console.log('Performing screening for Provider ID:', this.providerId);
    console.log('Selected High Risk Lists:', selectedListsLimited);

    // Call the screening service
    this.screeningService
      .isProviderOnHighRiskLists(
        this.providerId,
        selectedListsLimited.map((list) => list.id)
      )
      .then((result) => {
        this.updateResultTable(result);
        // Close the dialog
        //this.dialogRef.close();
      })
      .catch((error) => {
        console.error('Error performing screening:', error);
        // You might want to handle the error appropriately in your application
      });
  }

  updateResultTable(result: any) {
    // Assume you have a property like `screeningResults` in your component
    this.screeningResult = {
      isHighRisk: result.IsOnHighRiskLists,
      // You can include additional information from the result if needed
    };
  }
  cancel() {
    this.dialogRef.close();
  }
}
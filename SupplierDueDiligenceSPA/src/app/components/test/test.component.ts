import { Component, OnInit } from '@angular/core';
import { HighRiskListService } from '../../utils/services/high-risk-list.service';
import { ScreeningService } from '../../utils/services/screening.service';

@Component({
  selector: 'app-test',
  template: `
    <div>
      <h2>High Risk Lists and Screening Result TEST</h2>
      <button (click)="checkProvider()">Check Provider</button>
    </div>
  `,
})
export class TestComponent implements OnInit {
  highRiskLists: any[] = [];
  screeningResult: any;

  constructor(
    private highRiskListService: HighRiskListService,
    private screeningService: ScreeningService
  ) {}

  ngOnInit(): void {
    this.highRiskListService
      .getHighRiskLists()
      .then((lists) => {
        this.highRiskLists = lists;
      })
      .catch((error) => {
        console.error('Error fetching high-risk lists:', error);
        // Handle the error appropriately in your application
      });
  }

  checkProvider(): void {
    const providerId = 1; // Replace with the actual provider ID
    const highRiskListIds = this.highRiskLists.map((list) => list.id);

    console.log('High Risk Lists:', this.highRiskLists); // Add this line for the console log

    this.screeningService
      .isProviderOnHighRiskLists(providerId, highRiskListIds)
      .then((result) => {
        console.log('Screening Result:', result);
      })
      .catch((error) => {
        console.error('Error checking provider:', error);
        // Handle the error appropriately in your application
      });
  }
}

import { Injectable } from '@angular/core';
import { HighRiskList } from '../models/high-risk-list';

@Injectable({
  providedIn: 'root',
})
export class HighRiskListService {
  private apiUrl = 'https://localhost:7119/api/highRiskLists';

  constructor() {}

  getHighRiskLists(): Promise<HighRiskList[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  }
}

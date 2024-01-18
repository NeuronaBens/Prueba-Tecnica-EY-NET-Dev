import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private apiUrl = 'https://localhost:7119/api/screening';

  constructor() {}

  isProviderOnHighRiskLists(
    providerId: number,
    highRiskListIds: number[]
  ): Promise<{ IsOnHighRiskLists: boolean }> {
    const url = `${
      this.apiUrl
    }/${providerId}/onHighRiskLists?highRiskListIds=${highRiskListIds.join(
      ','
    )}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return { IsOnHighRiskLists: data.isOnHighRiskLists } as {
          IsOnHighRiskLists: boolean;
        };
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  }
}

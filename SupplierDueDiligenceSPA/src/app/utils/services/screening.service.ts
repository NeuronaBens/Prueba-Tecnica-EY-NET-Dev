import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private apiUrl = 'https://localhost:7119/api/screening';

  constructor() {}

  isProviderOnHighRiskLists(
    providerId: number,
    highRiskListIds: number[]
  ): Observable<{ IsOnHighRiskLists: boolean }> {
    // Create correct URL structure
    const url = `${this.apiUrl}/${providerId}/onHighRiskLists?${highRiskListIds
      .map((id) => `highRiskListIds=${id}`)
      .join('&')}`;

    return new Observable(
      (observer: Observer<{ IsOnHighRiskLists: boolean }>) => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            observer.next({ IsOnHighRiskLists: data.isOnHighRiskLists });
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
            observer.complete();
          });
      }
    );
  }
}

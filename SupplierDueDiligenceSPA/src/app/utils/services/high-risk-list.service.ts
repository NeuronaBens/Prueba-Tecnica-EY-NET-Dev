import { Injectable } from '@angular/core';
import { HighRiskList } from '../models/high-risk-list';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighRiskListService {
  private apiUrl = 'https://localhost:7119/api/highRiskLists';

  constructor() {}

  getHighRiskLists(): Observable<HighRiskList[]> {
    return new Observable((observer: Observer<HighRiskList[]>) => {
      fetch(this.apiUrl)
        .then((res) => res.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}

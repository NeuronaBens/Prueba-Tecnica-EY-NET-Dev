import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { ProviderModel } from '../models/provider';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = 'https://localhost:7119/api/providers'; // Replace with API endpoint

  constructor() {}

  getTestData(): Observable<ProviderModel[]> {
    // Mock data for testing purposes
    const testData: ProviderModel[] = [
      {
        id: 1,
        legalName: 'Test Company 1',
        tradeName: 'Test Trade 1',
        taxId: '12345678901',
        phoneNumber: '123-456-7890',
        email: 'test1@example.com',
        website: 'http://www.test1.com',
        physicalAddress: '123 Test St, Test City, Test Country',
        country: 'Test Country',
        annualRevenueUSD: 1000000,
        lastEdited: new Date(),
      },
      {
        id: 2,
        legalName: 'Test Company 2',
        tradeName: 'Test Trade 2',
        taxId: '98765432101',
        phoneNumber: '987-654-3210',
        email: 'test2@example.com',
        website: 'http://www.test2.com',
        physicalAddress: '456 Test St, Test City, Test Country',
        country: 'Test Country',
        annualRevenueUSD: 2000000,
        lastEdited: new Date(),
      },
    ];

    return of(testData);
  }

  getProviders(): Observable<ProviderModel[]> {
    return new Observable<ProviderModel[]>(
      (observer: Observer<ProviderModel[]>) => {
        axios
          .get<ProviderModel[]>(this.apiUrl)
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      }
    );
  }

  getProviderById(id: number): Observable<ProviderModel> {
    return new Observable((observer: Observer<ProviderModel>) => {
      fetch(`${this.apiUrl}/${id}`)
        .then((response) => response.json())
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

  addProvider(provider: ProviderModel): Observable<ProviderModel> {
    return new Observable((observer: Observer<ProviderModel>) => {
      fetch(`${this.apiUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
      })
        .then((response) => response.json())
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

  updateProvider(
    id: number,
    provider: ProviderModel
  ): Observable<ProviderModel> {
    return new Observable((observer: Observer<ProviderModel>) => {
      fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
      })
        .then((response) => response.json())
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

  deleteProvider(id: number): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}

// provider.model.ts

export interface ProviderModel {
  id: number;
  legalName: string;
  tradeName: string;
  taxId: string;
  phoneNumber: string;
  email: string;
  website: string;
  physicalAddress: string;
  country: string;
  annualRevenueUSD: number;
  lastEdited: Date;
}

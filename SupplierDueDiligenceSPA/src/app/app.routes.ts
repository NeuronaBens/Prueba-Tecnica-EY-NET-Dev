import { Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'app',
  },
  {
    path: 'app',
    component: DataTableComponent,
  },
];

import { Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TestComponent } from './components/test/test.component';

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
  {
    path: 'test',
    component: TestComponent,
  },
];

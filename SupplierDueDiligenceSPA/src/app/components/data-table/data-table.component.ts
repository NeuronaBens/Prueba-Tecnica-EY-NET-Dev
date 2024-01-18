import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { ProviderService } from '../../utils/services/provider.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProviderModel } from '../../utils/models/provider';
import { ProviderDetailsComponent } from '../provider-details/provider-details.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProviderComponent } from '../update-provider/update-provider.component';
import { ChangeDetectorRef } from '@angular/core';
import { ScreeningDialogComponent } from '../screening-dialog/screening-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['legalName', 'actions'];
  providers: ProviderModel[] = [];
  dataSource: MatTableDataSource<ProviderModel> =
    new MatTableDataSource<ProviderModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private providerService: ProviderService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.providerService.getProviders().subscribe(
      (data: ProviderModel[]) => {
        this.providers = this.providers = data.sort((a, b) => {
          return <any>new Date(b.lastEdited) - <any>new Date(a.lastEdited);
        });
        this.dataSource = new MatTableDataSource<ProviderModel>(this.providers);
        this.dataSource.paginator = this.paginator;

        // Log the data here to check if it has arrived
        console.log('Data received:', this.providers);
      },
      (error) => {
        console.error('Error fetching test data:', error);
      }
    );
  }

  showCompleteInfo(provider: ProviderModel) {
    const dialogRef = this.dialog.open(ProviderDetailsComponent, {
      width: '600px',
      data: provider,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //update provider
  updateProvider(provider: ProviderModel) {
    const dialogRef = this.dialog.open(UpdateProviderComponent, {
      width: '600px',
      data: provider,
    });

    dialogRef.afterClosed().subscribe((result: ProviderModel) => {
      if (result) {
        this.providerService.updateProvider(result.id, result).subscribe(
          (updatedProvider: ProviderModel) => {
            console.log('Updated provider:', updatedProvider);
            this.updateDataSource(updatedProvider);
          },
          (error) => {
            console.error('Error updating provider:', error);
          }
        );
      }
    });
  }

  updateDataSource(updatedProvider: ProviderModel) {
    const index = this.providers.findIndex((p) => p.id === updatedProvider.id);
    if (index !== -1) {
      this.providers[index] = updatedProvider;
      this.dataSource.data = this.providers.slice();
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  // delete provider
  deleteProvider(provider: ProviderModel) {
    this.providerService.deleteProvider(provider.id).subscribe(
      () => {
        console.log('Provider deleted successfully:', provider);
        this.deleteFromDataSource(provider);
      },
      (error) => {
        console.error('Error deleting provider:', error);
      }
    );
  }

  deleteFromDataSource(deletedProvider: ProviderModel) {
    const index = this.providers.findIndex((p) => p.id === deletedProvider.id);
    if (index !== -1) {
      this.providers.splice(index, 1);
      this.dataSource.data = this.providers.slice(); // Update the data source
    }
  }

  performScreening(provider: ProviderModel) {
    const dialogRef = this.dialog.open(ScreeningDialogComponent, {
      width: '600px',
      data: { providerId: provider.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Screening dialog closed');
    });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningDialogComponent } from './screening-dialog.component';

describe('ScreeningDialogComponent', () => {
  let component: ScreeningDialogComponent;
  let fixture: ComponentFixture<ScreeningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreeningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

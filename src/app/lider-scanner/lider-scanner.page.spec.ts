import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiderScannerPage } from './lider-scanner.page';

describe('LiderScannerPage', () => {
  let component: LiderScannerPage;
  let fixture: ComponentFixture<LiderScannerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LiderScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

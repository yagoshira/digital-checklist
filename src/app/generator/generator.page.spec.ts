import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GeneratorPage } from './generator.page';

describe('GeneratorPage', () => {
  let component: GeneratorPage;
  let fixture: ComponentFixture<GeneratorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

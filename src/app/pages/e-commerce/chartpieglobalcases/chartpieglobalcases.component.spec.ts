import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartpieglobalcasesComponent } from './chartpieglobalcases.component';

describe('ChartpieglobalcasesComponent', () => {
  let component: ChartpieglobalcasesComponent;
  let fixture: ComponentFixture<ChartpieglobalcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartpieglobalcasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartpieglobalcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

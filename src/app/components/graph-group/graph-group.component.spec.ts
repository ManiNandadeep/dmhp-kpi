import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGroupComponent } from './graph-group.component';

describe('GraphGroupComponent', () => {
  let component: GraphGroupComponent;
  let fixture: ComponentFixture<GraphGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

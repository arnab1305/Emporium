import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateOneComponent } from './template-one.component';

describe('TemplateOneComponent', () => {
  let component: TemplateOneComponent;
  let fixture: ComponentFixture<TemplateOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

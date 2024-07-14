import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticBuxaiteComponent } from './domestic-buxaite.component';

describe('DomesticBuxaiteComponent', () => {
  let component: DomesticBuxaiteComponent;
  let fixture: ComponentFixture<DomesticBuxaiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DomesticBuxaiteComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DomesticBuxaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

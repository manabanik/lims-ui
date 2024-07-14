import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdDomesticBuxaiteComponent } from './amd-domestic-buxaite.component';

describe('AmdDomesticBuxaiteComponent', () => {
  let component: AmdDomesticBuxaiteComponent;
  let fixture: ComponentFixture<AmdDomesticBuxaiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AmdDomesticBuxaiteComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AmdDomesticBuxaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

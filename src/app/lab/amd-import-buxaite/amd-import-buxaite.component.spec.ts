import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdImportBuxaiteComponent } from './amd-import-buxaite.component';

describe('AmdImportBuxaiteComponent', () => {
  let component: AmdImportBuxaiteComponent;
  let fixture: ComponentFixture<AmdImportBuxaiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AmdImportBuxaiteComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AmdImportBuxaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

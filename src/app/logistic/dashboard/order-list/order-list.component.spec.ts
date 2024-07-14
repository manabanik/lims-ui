import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsListComponent } from 'app/admin/jobs/jobs-list/jobs-list.component';



describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [JobsListComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

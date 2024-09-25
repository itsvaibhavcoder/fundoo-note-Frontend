import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchieveContainerComponent } from './archieve-container.component';

describe('ArchieveContainerComponent', () => {
  let component: ArchieveContainerComponent;
  let fixture: ComponentFixture<ArchieveContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchieveContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchieveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

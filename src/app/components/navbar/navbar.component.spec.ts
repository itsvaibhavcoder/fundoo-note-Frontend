import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/services/data-service/data.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    const mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml', 'sanitize']);
    mockSanitizer.bypassSecurityTrustHtml.and.callFake((value: string) => value);
    mockSanitizer.sanitize.and.callFake((_context: any, value: any) => value); 

    const mockMatIconRegistry = jasmine.createSpyObj('MatIconRegistry', ['addSvgIconLiteral']);
    mockMatIconRegistry.addSvgIconLiteral.and.callFake(() => {}); 
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: MatIconRegistry, useValue: mockMatIconRegistry },
        { provide: DomSanitizer, useValue: mockSanitizer }, 
        { provide: DataService, useValue: {} },
        { provide: Router, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit toggleDrawer when onMenuIconClick is called', () => {
    spyOn(component.toggleDrawer, 'emit');
    component.onMenuIconClick();
    expect(component.toggleDrawer.emit).toHaveBeenCalled();
  });


  it('should reload the page when refreshPage is called', () => {
    const originalReload = window.location.reload;
    const reloadSpy = jasmine.createSpy('reload');
    (window.location as any).reload = reloadSpy;
    component.refreshPage();
    expect(reloadSpy).toHaveBeenCalled();
    (window.location as any).reload = originalReload;
  });
});

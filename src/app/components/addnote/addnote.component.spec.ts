import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddnoteComponent } from './addnote.component';
import { NotesService } from 'src/services/notes-service/notes.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddnoteComponent', () => {
  let component: AddnoteComponent;
  let fixture: ComponentFixture<AddnoteComponent>;
  let noteServiceMock: any;
  let iconRegistryMock: any;
  let sanitizerMock: any;

  beforeEach(async () => {
    noteServiceMock = jasmine.createSpyObj('NotesService', ['createNoteApiCall']);
    iconRegistryMock = jasmine.createSpyObj('MatIconRegistry', ['addSvgIconLiteral']);
    sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

    await TestBed.configureTestingModule({
      declarations: [AddnoteComponent],
      providers: [
        { provide: NotesService, useValue: noteServiceMock },
        { provide: MatIconRegistry, useValue: iconRegistryMock },
        { provide: DomSanitizer, useValue: sanitizerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the showTakeNote state', () => {
    const initialShowTakeNote = component.showTakeNote;
    component.toggleTakeNote();
    expect(component.showTakeNote).toBe(!initialShowTakeNote);
  });

  it('should call the NotesService API when addNote is true', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    const mockNoteData = { data: { id: 1, title: 'Test Title', description: 'Test Description' } };
    
    noteServiceMock.createNoteApiCall.and.returnValue(of(mockNoteData));

    spyOn(component.updateList, 'emit');

    component.toggleTakeNote(true);

    expect(noteServiceMock.createNoteApiCall).toHaveBeenCalledWith('notes', { Title: 'Test Title', Description: 'Test Description' });
    expect(component.updateList.emit).toHaveBeenCalledWith({ action: 'add', data: mockNoteData.data });
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });

  it('should handle error when the NotesService API call fails', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    const error = 'API error';

    noteServiceMock.createNoteApiCall.and.returnValue(throwError(error));
    spyOn(console, 'log');

    component.toggleTakeNote(true);

    expect(noteServiceMock.createNoteApiCall).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('should reset title and description after adding a note', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    
    noteServiceMock.createNoteApiCall.and.returnValue(of({ data: {} }));

    component.toggleTakeNote(true);

    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });

  it('should not call the NotesService API when addNote is false', () => {
    spyOn(component.updateList, 'emit');
    component.toggleTakeNote(false);
    
    expect(noteServiceMock.createNoteApiCall).not.toHaveBeenCalled();
    expect(component.updateList.emit).not.toHaveBeenCalled();
  });
});


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ARCHIVE_ICON,
  COLLABRATOR_ICON,
  COLOR_PALATTE_ICON,
  DELETE_FOREVER_ICON,
  IMG_ICON,
  MORE_ICON,
  REMINDER_ICON,
  RESTORE_ICON,
  UNARCHIVE_ICON,
} from 'src/assets/svg-icons';
import { NotesService } from 'src/services/notes-service/notes.service';
import { AddnoteComponent } from '../addnote/addnote.component';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() noteDetails: any = {};
  @Input() container: string = 'notes';
  @Output() updateList = new EventEmitter();

  constructor(
    private notesService: NotesService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral(
      'reminder-icon',
      sanitizer.bypassSecurityTrustHtml(REMINDER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'collabrator-icon',
      sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'color-palatte-icon',
      sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'img-icon',
      sanitizer.bypassSecurityTrustHtml(IMG_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'archive-icon',
      sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'more-icon',
      sanitizer.bypassSecurityTrustHtml(MORE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'delete-forever-icon',
      sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'restore-icon',
      sanitizer.bypassSecurityTrustHtml(RESTORE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'unarchive-icon',
      sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON)
    );
  }

  ngOnInit(): void {}

  handleNotesIconsClick(action: string, color: string = '#ffffff') {
    if (action === 'color' && color) {
      this.noteDetails.color = color;
      this.notesService
        .changeColorById('notes', this.noteDetails._id, color)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } 
    else if (action === 'archive' || action === 'unarchive') {
      this.notesService
        .archiveNoteById('notes', this.noteDetails._id)
        .subscribe({
          next: (res) => {
            console.log('Archived successfully:', res);
          },
          error: (err) => {
            console.log('Error archiving note:', err);
          },
        });
    } else if (action === 'trash' || action === 'restore') {
      this.notesService
        .archiveNoteById('notes', this.noteDetails._id)
        .subscribe({
          next: (res) => {
            console.log('Archived successfully:', res);
          },
          error: (err) => {
            console.log('Error archiving note:', err);
          },
        });
    } else if (action === 'deleteForever') {
      this.notesService
        .deleteNoteById('notes', this.noteDetails._id)
        .subscribe({
          next: (res) => {
            console.log('Deleted successfully:', res);
          },
          error: (err) => {
            console.log('Error deleting note:', err);
          },
        });
    }
    this.updateList.emit({ action, data: this.noteDetails });
  }
  handleEditNote() {
    this.dialog.open(AddnoteComponent, {
      data: {
        addNoteState: false,
      },
    });
  }
}

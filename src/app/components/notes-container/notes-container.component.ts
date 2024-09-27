import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: any[] = [];
  
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  //Fetch all notes from the API (Backend)
  loadNotes() {
    this.notesService.getNotesApiCall('notes').subscribe({
      next: (res: any) => {
        console.log(res.data[0]._id);
        this.notesList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //Handle archiving a note
  // onArchiveNote(noteId: string) {
  //   console.log(noteId);
  //   this.notesService.archiveNoteById('notes', noteId).subscribe({
  //     next: () => {
  //       console.log('Note archived successfully');
  //       this.notesList = this.notesList.filter(note => note.id !== noteId);
  //     },
  //     error: (err) => {
  //       console.log('Error archiving note:', err);
  //     }
  //   });
  // }

  //Handle deleting a note
  // onDeleteNote(noteId: string) {
  //   this.notesService.deleteNoteById('notes', noteId).subscribe({
  //     next: () => {
  //       console.log('Note deleted successfully');
  //       this.notesList = this.notesList.filter(note => note.id !== noteId);
  //     },
  //     error: (err) => {
  //       console.log('Error deleting note:', err);
  //     }
  //   });
  // }

  // Handle updates to the notes list (for adding new notes)
  handleUpdateNotesList($event: { action: string, data: any }) {
    console.log($event);
    if ($event.action === 'add') {
      this.notesList = [$event.data, ...this.notesList];
    }
    else if($event.action ==='archive' || $event.action ==='trash'){
      this.notesList = this.notesList.filter(note => note._id !== $event.data._id);
    }
  }
}

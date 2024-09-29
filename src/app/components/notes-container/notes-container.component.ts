import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data-service/data.service';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
})
export class NotesContainerComponent implements OnInit {
  notesList: any[] = [];
  searchQuery: string = '';
  constructor(
    private notesService: NotesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.dataService.curSearchQuery.subscribe({
      next: (data) => {
        this.searchQuery = data;
      },
    });
  }

  //Fetch all notes from the API (Backend)
  loadNotes() {
    this.notesService.getNotesApiCall('notes').subscribe({
      next: (res: any) => {
        console.log(res.data[0]._id);
        //this.notesList = res.data.filter((note: any) => !note.isArchive);
        this.notesList = res.data.filter((note: any) => !note.isArchived && !note.isTrash);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Handle updates to the notes list (for adding new notes)
  handleUpdateNotesList($event: { action: string; data: any }) {
    console.log($event);
    if ($event.action === 'add') {
      this.notesList = [$event.data, ...this.notesList];
    } 
    else if ($event.action === 'archive') {
      this.notesService
        .archiveNoteById('notes', $event.data._id)
        .subscribe({
          next: (res) => {
            console.log('Archived successfully:', res);
            this.notesList = this.notesList.filter((note) => note._id !== $event.data._id
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
    } 
    else if ($event.action === 'trash') {
      this.notesService.trashNoteById('notes', $event.data._id).subscribe({
        next: (res) => {
          console.log(res);
          this.notesList = this.notesList.filter(
            (note) => note._id !== $event.data._id
          );
        },
        error: (err) => {
          console.log('Error trashing note:', err);
        },
      });
    }
  }
}

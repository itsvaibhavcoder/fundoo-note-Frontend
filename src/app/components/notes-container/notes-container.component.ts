import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from 'src/services/data-service/data.service';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
})
export class NotesContainerComponent implements OnInit, OnDestroy {
  notesList: any[] = [];
  searchQuery: string = '';
  subscription!: Subscription;
  
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

  // Fetch all notes from the API (Backend)
  loadNotes() {
    this.notesService.getNotesApiCall('notes').subscribe({
      next: (res: any) => {
        this.notesList = res.data.filter(
          (note: any) => !note.isArchive && !note.isTrash
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Handle events coming from child components
  handleUpdateNotesList($event: { action: string; data: any }) {
    if ($event.action === 'add') {
      // Add a new note to the list
      this.notesList = [$event.data, ...this.notesList];
    } 
    else if ($event.action === 'archive' || $event.action === 'trash') {
      // Remove archived or trashed notes
      this.notesList = this.notesList.filter(
        (note) => note._id !== $event.data._id
      );
    } 
    else if ($event.action === 'color' || $event.action === 'edit') {
      this.notesList = this.notesList.map(
        (note) => {
          if(note._id === $event.data._id){
            return $event.data;
          }
          return note;
        }
      );
    }
  }

  // Unsubscribe from subscriptions
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

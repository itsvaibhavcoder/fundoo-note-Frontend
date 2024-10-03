import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/services/data-service/data.service';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-archieve-container',
  templateUrl: './archieve-container.component.html',
  styleUrls: ['./archieve-container.component.scss']
})
export class ArchieveContainerComponent implements OnInit, OnDestroy {
  notesList: any[] = [];
  searchQuery: string = '';
  subscription!: Subscription;
  constructor(private noteService: NotesService, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadNotes();
    this.dataService.curSearchQuery.subscribe({
      next: (data) => {
        this.searchQuery = data;
      },
    });
  }

  loadNotes() {
    this.noteService.getNotesApiCall('notes')
      .subscribe({
        next: (res: any) => {
          this.notesList = res.data.filter((note:any)=>note.isArchive===true);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  //Handle updates to the notes list (for adding, archiving, or trashing)
  handleUpdateNotesList($event: { action: string, data: any }) {
    console.log($event);
    if ($event.action === 'unarchive') {
      this.notesList = this.notesList.filter(note => note._id !== $event.data._id);
    } 
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

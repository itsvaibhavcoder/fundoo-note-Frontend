import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit {

  notesList: any[] = [];

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  // Fetch notes from the API
  loadNotes() {
    this.noteService.getNotesApiCall('trash')
      .subscribe({
        next: (res: any) => {
          this.notesList = res.data;
        },
        error: (err:any) => {
          console.log(err);
        }
      });
  }

  //Handle updates to the notes list (for adding, archiving, or trashing)
  handleUpdateNotesList($event: { action: string, data: any }) {
    console.log($event);
    if ($event.action === 'add') {
      this.notesList = [$event.data, ...this.notesList];
    } 
    else if ($event.action === 'archive' || $event.action === 'trash') {
      this.notesList = this.notesList.filter(note => note._id !== $event.data._id);
    }
  }

}

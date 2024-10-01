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
    this.noteService.getNotesApiCall('notes')
      .subscribe({
        next: (res: any) => {
          this.notesList = res.data.filter((note:any)=>note.isTrash===true);
        },
        error: (err:any) => {
          console.log(err);
        }
      });
  }

  handleUpdateNotesList($event: { action: string, data: any }) {
    if ($event.action === 'restore') {
      this.notesList = this.notesList.filter(note => note._id !== $event.data._id);
    }
    else if($event.action==='deleteForever'){
      this.notesList = this.notesList.filter(note=>note._id !== $event.data._id)
    }
  }
}

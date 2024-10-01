import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-archieve-container',
  templateUrl: './archieve-container.component.html',
  styleUrls: ['./archieve-container.component.scss']
})
export class ArchieveContainerComponent implements OnInit {
  notesList: any[] = [];
  
  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
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
}

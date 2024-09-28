import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data-service/data.service';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: any[] = [];
  searchQuery: string = ""
  constructor(private notesService: NotesService, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadNotes();
    this.dataService.curSearchQuery.subscribe({
      next: (data)=>{
        this.searchQuery = data;
      }
    })
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

  //Handle updates to the notes list (for adding new notes)
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

import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList:any [] = []
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotesApiCall('notes').subscribe({
      next:(res:any)=>{
        console.log(res.data);
        this.notesList = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}

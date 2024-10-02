import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LIST_VIEW_ICON,BRUSH_ICON, TICK_ICON, IMG_ICON, UNDO_ICON,REDO_ICON, PIN_ICON} from 'src/assets/svg-icons';
import { NotesService } from 'src/services/notes-service/notes.service';
@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  title:string = "";
  description:string = "";
  color:string = "#ffffff";
  showTakeNote: boolean = true;
  isExpanded: boolean = true;
  @Output() updateList= new EventEmitter();
  constructor(@Optional() public dialogRef: MatDialogRef<AddnoteComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: {noteDetails:any},iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private noteService: NotesService) {
    iconRegistry.addSvgIconLiteral('list-view', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('brush', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('Image', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('tick', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON));
    console.log(data);
    if(data){
      this.showTakeNote = false;
      this.title = data.noteDetails.Title,
      this.description = data.noteDetails.Description,
      this.color = data.noteDetails.color
    }
  }

 
  ngOnInit(): void {
  }
  toggleTakeNote(addNote:boolean=false){
    this.showTakeNote = !this.showTakeNote;
    if(addNote && this.data){
          this.dialogRef.close({
            ...this.data.noteDetails,
            Title: this.title,
            Description: this.description,
            //color: this.color
          })
    }
    //change here 
    if(addNote && !this.data){
      this.noteService.createNoteApiCall("notes",{Title: this.title, Description:this.description}).subscribe({
        next:(data:any)=>{
          this.updateList.emit({action:"add", data:data?.data})
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
    this.title = ""
    this.description = ""
    console.log(this.title);
    console.log(this.description);
  }
}

//@Inject(MAT_DIALOG_DATA) public data: {addNoteState: boolean},
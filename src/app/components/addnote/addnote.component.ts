import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  showTakeNote: boolean = true;
  constructor() {}

  ngOnInit(): void {
  }
  toggleTakeNote(){
    this.showTakeNote = !this.showTakeNote;
  }
}
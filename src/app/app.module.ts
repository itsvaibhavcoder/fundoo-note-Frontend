import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchieveContainerComponent } from './components/archieve-container/archieve-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { AddnoteComponent } from '../app/components/addnote/addnote.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewNoteComponent } from './components/new-note/new-note.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NoteCardComponent,
    NavbarComponent,
    NotesContainerComponent,
    ArchieveContainerComponent,
    TrashContainerComponent,
    DashboardContainerComponent,
    AddnoteComponent,
    NewNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

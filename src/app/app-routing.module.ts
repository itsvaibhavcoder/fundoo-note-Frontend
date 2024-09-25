import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchieveContainerComponent } from './components/archieve-container/archieve-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
       path: "notes",
       component: NotesContainerComponent
      },
      {
        path: "archive",
        component: ArchieveContainerComponent
       },
       {
        path: "trash",
        component: TrashContainerComponent
       },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

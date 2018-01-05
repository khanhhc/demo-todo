import {Component, OnInit} from '@angular/core';
import {Note} from '../note';
import {NoteService} from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  content: string;
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.notes = this.noteService.fetchNotes();
  }

  addNote() {
    const content = this.content.trim();
    if (content !== '') {
      this.noteService.addNote({done: false, content});
    }
    this.content = '';
  }

  onDeleteNote(index: number) {
    this.noteService.deleteNote(index);
  }

}

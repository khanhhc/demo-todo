import {Injectable} from '@angular/core';
import {Note} from './note';

const notes: Note[] = [
  {done: true, content: 'Initialize project'},
  {done: true, content: 'Add Notes component'},
  {done: true, content: 'Add Note service'},
  {done: false, content: 'Write test cases for Note services'},
];

@Injectable()
export class NoteService {

  constructor() {
  }

  fetchNotes() {
    return notes;
  }

  addNote(note: Note) {
    notes.push(note);
  }

  deleteNote(index: number) {
    notes.splice(index, 1);
  }

}

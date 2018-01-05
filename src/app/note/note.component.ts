import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() index: number;
  @Input() note: Note;
  @Output() deleteNote = new EventEmitter();

  editMode = false;
  changeContent: string;

  constructor() {

  }

  ngOnInit() {
    this.changeContent = this.note.content;
  }

  handleDeleteNote() {
    this.deleteNote.emit(this.index);
  }

  changeEditMode(isEdit: boolean) {
    this.editMode = isEdit;
  }

  saveNote() {
    this.note.content = this.changeContent;
    this.changeEditMode(false);
  }

}

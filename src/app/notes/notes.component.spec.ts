import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesComponent} from './notes.component';
import {NoteComponent} from '../note/note.component';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../note.service';
import {By} from '@angular/platform-browser';
import {Note} from '../note';

let notes = [];

class MockNoteService {
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

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NoteComponent, NotesComponent],
      providers: [
        {provide: NoteService, useClass: MockNoteService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    notes = [
      {done: false, content: 'note 1'},
      {done: false, content: 'note 2'}
    ];

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate the list of notes', () => {
    const noteElements = fixture.debugElement.queryAll(By.css('.note'));
    expect(noteElements.length).toEqual(2);
  });

  it('should add a new note from user input', () => {
    const content = fixture.debugElement.query(By.css('.content')).nativeElement;
    const noteAdd = fixture.debugElement.query(By.css('button.note-add')).nativeElement;

    content.value = 'this is new content';
    content.dispatchEvent(new Event('input'));

    noteAdd.click();
    fixture.detectChanges();

    expect(notes.length).toEqual(3);
  });

  it('should not add an empty note from user input', () => {
    const content = fixture.debugElement.query(By.css('.content')).nativeElement;
    const noteAdd = fixture.debugElement.query(By.css('button.note-add')).nativeElement;

    content.value = '';
    content.dispatchEvent(new Event('input'));
    noteAdd.click();
    fixture.detectChanges();

    expect(notes.length).toEqual(2);
  });

  it('should clear user input after adding', () => {
    const content = fixture.debugElement.query(By.css('.content')).nativeElement;
    const noteAdd = fixture.debugElement.query(By.css('button.note-add')).nativeElement;

    content.value = 'this is new content';
    content.dispatchEvent(new Event('input'));
    noteAdd.click();
    fixture.detectChanges();

    expect(component.content).toEqual('');
  });

  it('should trim the text from user input before adding', () => {
    const content = fixture.debugElement.query(By.css('.content')).nativeElement;
    const noteAdd = fixture.debugElement.query(By.css('button.note-add')).nativeElement;

    content.value = '     this is new content       ';
    content.dispatchEvent(new Event('input'));
    noteAdd.click();
    fixture.detectChanges();

    const note = notes[component.notes.length - 1];

    expect(note.content).toEqual('this is new content');
  });
});

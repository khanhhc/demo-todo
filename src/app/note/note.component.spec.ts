import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoteComponent} from './note.component';
import {NotesComponent} from '../notes/notes.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let noteCheckBox: HTMLElement;
  let noteEdit: HTMLElement;
  let noteDelete: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NotesComponent, NoteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;

    component.note = {done: false, content: 'this is a note'};
    fixture.detectChanges();
    noteCheckBox = fixture.debugElement.query(By.css('.note-checkbox')).nativeElement;
    noteEdit = fixture.debugElement.query(By.css('button.note-edit')).nativeElement;
    noteDelete = fixture.debugElement.query(By.css('button.note-delete')).nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change done status when mark down', () => {
    noteCheckBox.click();
    expect(component.note.done).toBe(true);
  });

  it('should change to edit mode when click edit', () => {
    noteEdit.click();
    expect(component.editMode).toBe(true);
  });

  it('should change to view mode when click cancel', () => {
    component.editMode = true;
    fixture.detectChanges();

    const noteCancel = fixture.debugElement.query(By.css('button.note-cancel')).nativeElement;
    noteCancel.click();
    expect(component.editMode).toBe(false);
  });

  it('should emit delete event when click delete', (done) => {
    component.index = 10;
    component.deleteNote.subscribe(index => {
      expect(index).toEqual(component.index);
      done();
    });

    noteDelete.click();
  });
  //
  // it('should change the content success', () => {
  //   component.editMode = true;
  //   fixture.detectChanges();
  //
  //   const noteSave = fixture.debugElement.query(By.css('button.note-save')).nativeElement;
  //   const noteContent = fixture.debugElement.query(By.css('input.note-content')).nativeElement;
  //   noteContent.value = 'content is changed';
  //
  //   noteSave.click();
  //   fixture.detectChanges();
  //
  //   expect(component.editMode).toBe(false);
  //   expect(component.changeContent).toEqual('content is changed');
  // });

  it('should change the edit mode to view mode when save a valid mode', () => {
    component.editMode = true;
    fixture.detectChanges();

    const noteSave = fixture.debugElement.query(By.css('button.note-save')).nativeElement;
    noteSave.click();
    fixture.detectChanges();

    expect(component.editMode).toBe(false);
  });
});

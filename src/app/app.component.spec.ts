import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NotesComponent} from './notes/notes.component';
import {FormsModule} from '@angular/forms';
import {NoteComponent} from './note/note.component';
import {NoteService} from './note.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        NoteComponent,
        NotesComponent,
        AppComponent,
      ],
      providers: [NoteService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

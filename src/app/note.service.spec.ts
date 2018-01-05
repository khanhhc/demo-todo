import {inject, TestBed} from '@angular/core/testing';

import {NoteService} from './note.service';

describe('NoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteService]
    });
  });

  it('should be created', inject([NoteService], (service: NoteService) => {
    expect(service).toBeTruthy();
  }));

  it('should return all notes', inject([NoteService], (service: NoteService) => {
    expect(service.fetchNotes().length).toEqual(4);
  }));

  it('should delete a existed note', inject([NoteService], (service: NoteService) => {
    service.deleteNote(0);
    expect(service.fetchNotes().length).toEqual(3);
  }));

  it('should add a new note', inject([NoteService], (service: NoteService) => {
    service.addNote({done: false, content: 'this is a note'});
    expect(service.fetchNotes().length).toEqual(4);
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEditorComponent } from './animal-editor.component';

describe('AnimalEditorComponent', () => {
  let component: AnimalEditorComponent;
  let fixture: ComponentFixture<AnimalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

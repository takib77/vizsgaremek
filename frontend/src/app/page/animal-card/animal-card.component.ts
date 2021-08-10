import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animal } from 'src/app/model/animal';
import { User } from 'src/app/model/user';
import { AnimalService } from 'src/app/service/animal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent implements OnInit {

  animalList$: Observable<Animal[]> = this.animalservice.getAll()
    .pipe(map(items => items
      .filter(animal => animal.active === true)
      .sort(() => 0.5 - Math.random())));

  user$: User = new User();

  selectAnimal: EventEmitter<Animal> = new EventEmitter<Animal>();
  modalTitle: string = '';
  modalText: string = '';

  constructor(
    private animalservice: AnimalService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.user$.role = 0;
  }

  onClickImage(animal: Animal): void {
    this.selectAnimal.emit(animal);
    this.modalTitle = animal.name;
    this.modalText = animal.description;
  }

}

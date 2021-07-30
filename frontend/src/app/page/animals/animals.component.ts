import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {

  animalsList$: Observable<Animal[]> = this.animalservice.getAll();
  animalsTable: IDataDisplayer[] = this.config.animalsTable;
  animalsTitle: string = 'Kisállatok listája';

  constructor(
    private animalservice: AnimalService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}

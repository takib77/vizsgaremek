import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';
import { ConfigService, IDataDisplayer } from 'src/app/service/config.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

  animalList$: Observable<Animal[]> = this.animalservice.getAll();
  animalTable: IDataDisplayer[] = this.config.animalTable;
  animalTitle: string = 'Kisállatok listája';

  constructor(
    private animalservice: AnimalService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
  }

}

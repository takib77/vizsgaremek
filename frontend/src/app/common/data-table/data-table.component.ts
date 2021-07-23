import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  animalList: Observable<Animal[]> = this.animalservice.getAll();

  constructor(
    private animalservice: AnimalService
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  animalSearch: IDataDisplayer[] = this.config.animalSearch;
  animalTitle: string = 'Kisállatok listája';
  pageName: string = 'animals';

  constructor(
    private animalservice: AnimalService,
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  onSelectOne(animal: Animal): void {
    this.router.navigate(['/animals/edit', animal._id])
  }

  onDeleteOne(animal: Animal): void {
    if (confirm(`Biztos hogy törli a(z) \"${animal.name}\" nevű kisállatot?`)) {
      this.animalservice.delete(animal).subscribe(
        () => this.animalList$ = this.animalservice.getAll());
      this.toastr.warning('Az adat törölve lett!', 'Törölve', { timeOut: 3000 });
    }
  }

}

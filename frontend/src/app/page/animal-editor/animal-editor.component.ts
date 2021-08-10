import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-animal-editor',
  templateUrl: './animal-editor.component.html',
  styleUrls: ['./animal-editor.component.scss']
})
export class AnimalEditorComponent implements OnInit {

  animal: Animal = new Animal();
  title: string = '';

  constructor(
    private animalservice: AnimalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === '0') {
          this.animal = new Animal();
          this.title = 'Új kisállat felvétele';
        }
        else
          this.animalservice.get(params.id).subscribe(
            item => {
              this.animal = item;
              this.title = 'Kisállat szerkesztése';
            })
      })
  }

  onSubmit(animal: Animal): void {
    if (!animal._id) {
      this.animalservice.create(animal).subscribe(() => {
        this.router.navigate(['/animals']);
        this.toastr.info('Az adatok mentése sikerrel zárult!', 'Mentve', { timeOut: 3000 });
      });

    } else {
      this.animalservice.update(animal).subscribe(() => {
        this.router.navigate(['/animals']);
        this.toastr.info('Az adatok módosítása sikerrel zárult!!', 'Módosítva', { timeOut: 3000 });
      });
    }
  }

}

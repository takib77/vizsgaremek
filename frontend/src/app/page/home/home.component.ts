import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardData = [
    {
      name: 'Kisállatok',
      description: 'Kisemlősök, díszmadarak, hüllők, halak avagy a legújabb barátja',
      img: 'assets/img/250.png',
      link: '/animal-cards'
    },
    {
      name: 'Eledelek',
      description: 'Kisállataink táplálásához szükséges minőségi eledelek',
      img: 'assets/img/250.png',
      link: '/food-cards'
    },
    {
      name: 'Felszerelések',
      description: 'A kiskedvencek tartásához szükséges felszerelések, mint pl. ketrecek, akváriumok, etetőtálak, itatóedények...',
      img: 'assets/img/250.png',
      link: '/equipment-cards'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

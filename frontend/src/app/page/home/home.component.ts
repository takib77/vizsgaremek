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
      description: 'Kisemlősök, díszmadarak, halak avagy a legújabb barátja',
      img: 'https://i3x7x2h3.stackpathcdn.com/media/catalog/product/cache/38477fa0e8f278933b923d30d360ffa4/a/r/arany_kolibri_01_1.jpg',
      link: '/animal-cards'
    },
    {
      name: 'Eledelek',
      description: 'Kisállataink táplálásához szükséges minőségi eledelek',
      img: 'https://abc-zoo.hu/2387-21729-thickbox/crispy-muesli-hamsters-co-ragcsalotap-1-kg.jpg',
      link: '/food-cards'
    },
    {
      name: 'Felszerelések',
      description: 'A kiskedvencek tartásához szükséges felszerelések, mint pl. ketrecek, akváriumok, etetőtálak, itatóedények...',
      img: 'https://abc-zoo.hu/4361-29497-thickbox/iza-iii-papagaj-kalitka-585-x-38-x-65-cm.jpg',
      link: '/equipment-cards'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

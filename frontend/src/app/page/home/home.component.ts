import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardData = [
    {
      category: 'Rágcsálók',
      description: 'Hörcsögök, tengerimalacok, egerek..',
      id: 'flush-headingOne',
      target: 'flush-collapseOne',
      img: 'assets/img/250.png'
    },
    {
      category: 'Hüllők',
      description: 'Kaméleon, teknős...',
      id: 'flush-headingTwo',
      target: 'flush-collapseTwo',
      img: 'assets/img/250.png'
    },
    {
      category: 'Halak',
      description: 'Akváriumba tartható édesvizi halak...',
      id: 'flush-headingThree',
      target: 'flush-collapseThree',
      img: 'assets/img/250.png'
    },
    {
      category: 'Madarak',
      description: 'Papagájok, kanárik és más tollassok...',
      id: 'flush-headingFour',
      target: 'flush-collapseFour',
      img: 'assets/img/250.png'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

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
      target: 'flush-collapseOne'
    },
    {
      category: 'Hüllők',
      description: 'Kaméleon, teknős...',
      id: 'flush-headingTwo',
      target: 'flush-collapseTwo'
    },
    {
      category: 'Halak',
      description: 'Akváriumba tartható édesvizi halak...',
      id: 'flush-headingThree',
      target: 'flush-collapseThree'
    },
    {
      category: 'Madarak',
      description: 'Papagájok, kanárik és más tollassok...',
      id: 'flush-headingFour',
      target: 'flush-collapseFour'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

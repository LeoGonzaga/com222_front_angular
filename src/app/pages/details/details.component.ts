import { Component, OnInit } from '@angular/core';
import { AllGamesService } from 'src/app/services/all-games.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(private games: AllGamesService) {}

  ngOnInit(): void {
    this.getReview();
  }
  name: string;
  image: string;
  description: string;
  rate: number;
  allReviews = [];
  getReview() {
    console.log(window.location.href);
    let plataform = window.location.href.split('details/');
    console.log(plataform[1]);

    this.games.getReviews(plataform[1]).subscribe((games: any) => {
      console.log(games[0]);
      this.name = games[0].name;
      this.image = games[0].imageUrl;
      this.rate = games[0].rate;
      this.description = games[0].summary;
      console.log(this.name, this.image, this.rate, this.description);
      games[1].map((i) => {
        this.allReviews.push(i);
      });

      // console.log(this.allReviews);
    });
  }
}

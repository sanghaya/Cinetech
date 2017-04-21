import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "./movie.model";
import { MovieService } from "./movie.service";

@Component({
    selector: 'app-movie-stars',
    templateUrl: './movie-stars.component.html',
    styles: [`
         
    `]
})
export class MovieStarsComponent implements OnInit {
    numStars : number = 0;
    @Input() movie: Movie;

    labelShow = false;
    stars = [];

    constructor(private movieService : MovieService) {}

    ngOnInit() {
        for (let i = 1; i <= 5; i++) {
            this.stars.push({"id": i, "fill": false, "color": "black"});
        }

        this.fillStars(this.numStars);

        this.movieService.getStars(localStorage.getItem('userId'), this.movie.id)
            .subscribe(numStars => this.numStars = numStars);
    }

    focusStars(starId) {
        this.fillStars(starId);
    }

    unfocusStars() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].fill = false;
            this.stars[i].color = "black";
        }
    }

    fillStars(rating) {
        for (let i = rating - 1; i >= 0; i--) {
            this.stars[i].fill = true;
            this.stars[i].color = "#e3cf7a";
        }
    }

    movieClick(starId) {
        this.movieService.updateStars(localStorage.getItem('userId'), this.movie.id, starId)
            .subscribe(
                result => console.log(result)
            );
    }
}
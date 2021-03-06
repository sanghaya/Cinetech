import { Component, Input, OnInit } from "@angular/core";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from "./movie.model";
import { MovieService } from "./movie.service";

@Component({
    selector: 'app-movie-detail-modal',
    templateUrl: './movie-detail-modal.component.html',
    styles: [`
        .detail-poster {
            width: 100%;
        }

        #synopsis {
            padding-top: 30px;
        }
    
        .embed-trailer {
            width: 97%;
            position: relative;
        }

        .detail-movie-input {
            padding-left: 30px;
            display: table;
            padding-bottom: 30px;
        }

        .detail-modal-cast-image {
            width: 100%;
        }
    `]
})
export class MovieDetailModalComponent implements OnInit {
    @Input() movie : Movie;
    similarMovies : Movie[];
    slides = [];
    fixed = true;

    ngOnInit() {
        this.slides = [
            {"img": 'http://image.tmdb.org/t/p/w780' + this.movie.backdrop_path, "info": {"label": "", "title": "", "average": ""}}
        ]
        
        this.movieService.getSimilarMovies(this.movie.genres)
            .subscribe(
                (movies: Movie[]) => {
                    this.similarMovies = movies;
            });
    }

    constructor(public activeModal: NgbActiveModal, private movieService: MovieService) { }
}
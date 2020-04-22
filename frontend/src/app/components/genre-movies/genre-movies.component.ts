import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-genre-movies',
  templateUrl: './genre-movies.component.html',
  styleUrls: ['./genre-movies.component.scss']
})
export class GenreMoviesComponent implements OnInit {
  public allMovies;
  Movie = []

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.genre.subscribe(genre => {
      const genreId = genre['id'];
      if (genreId) {
        this.movieService.getByGenre(genreId)
          .subscribe(res => {
            this.allMovies = res['results'];
          },
            error => console.error(error));
      }
    })
  }

  getMovieById(movieId) {
    this.movieService.movieIdDetails.next({movie:movieId, component:"genre"});
  }
}
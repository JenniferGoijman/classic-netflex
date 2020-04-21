import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  showTrailer;

  constructor(
    public sanitizer: DomSanitizer,
    public movieService: MovieService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.movieService.showPopularMovies = true;
    this.movieService.showOrderMovies = true;
    this.movieService.showBigTrailer = true;
    this.movieService.showGenreMovies = false;
    this.movieService.showSearchResults = false;
  }
}
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
    this.movieService.showPopularMovies==undefined?this.movieService.showPopularMovies=true:false;
    this.movieService.showOrderMovies==undefined?this.movieService.showOrderMovies=true:false;
    this.movieService.showBigTrailer==undefined?this.movieService.showBigTrailer=true:false;
    // this.movieService.showGenreMovies = false;
    // this.movieService.showSearchResults = false;
    console.log(this.movieService.showPopularMovies)
  }
}
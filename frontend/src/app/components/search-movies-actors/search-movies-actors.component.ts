import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-movies-actors',
  templateUrl: './search-movies-actors.component.html',
  styleUrls: ['./search-movies-actors.component.scss']
})
export class SearchMoviesActorsComponent implements OnInit {
  movies;
  actors;

  constructor(public route: ActivatedRoute,
    public movieService: MovieService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {

        this.movieService.getByQuery(params.search)
          .subscribe(
            (res: HttpResponse<any>) => { this.movies = res['results']; },
            (error: HttpErrorResponse) => console.log(error)
          );

        this.movieService.getActorsByQuery(params.search)
          .subscribe(
            (res: HttpResponse<any>) => { this.actors = res['results']; console.log(this.actors)},
            (error: HttpErrorResponse) => console.log(error)
          );
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
//import { MatTableDataSource, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public allMovies;
  public isHover;
  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.movieService.getPopular()
      .subscribe(res => { this.allMovies = res.results },
        error => console.error(error));
  }
}
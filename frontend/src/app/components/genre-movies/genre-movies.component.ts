import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 10;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allMovies;
  Movie = []
  showMovieDetails = false;
  public MovieId=0;

  constructor(public movieService: MovieService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.movieService)
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
    this.showMovieDetails = true;
    this.MovieId=movieId;
    console.log(this.MovieId, movieId)
  }

  nextPage() {
    this.dataSource.paginator.nextPage();
    this.updateNextAndPreviousPage();
  }
  previousPage() {
    this.dataSource.paginator.previousPage();
    this.updateNextAndPreviousPage();
  }
  updateNextAndPreviousPage() {
    this.hasPreviousPage = this.dataSource.paginator.hasPreviousPage();
    this.hasNextPage = this.dataSource.paginator.hasNextPage();
  }

  public pageChange(event?: PageEvent) {
    console.log(event);
    console.log(this.dataSource)
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}

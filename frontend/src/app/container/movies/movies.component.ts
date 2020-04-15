import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allMovies;
  Movie = []

  constructor(public movieService: MovieService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.movieService.getPopular()
      .subscribe(res => {
        this.allMovies = res.results;
        this.changeDetectorRef.detectChanges();
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.hasPreviousPage = false;
        this.hasNextPage = true;
        this.allMovies.forEach(m => {this.Movie.push({id:m.id, title:m.title, image:m.backdrop_path}) })
        this.dataSource = new MatTableDataSource<Movie>(this.Movie);
        console.log(this.dataSource);
        this.obs = this.dataSource.connect();
      },
        error => console.error(error));
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
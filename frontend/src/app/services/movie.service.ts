import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  genre = new BehaviorSubject({});
  movieIdDetails = new BehaviorSubject({})
  api_key = "api_key=cea68b520beecac6718820e4ac576c3a";
  showMovieDetails: boolean;
  showPopularMovies: boolean;
  showOrderMovies: boolean;
  showBigTrailer: boolean;
  showGenreMovies: boolean;
  showSearchResults: boolean;
  mostPopularMovie: number;

  constructor(public httpClient: HttpClient) { }

  getPopular(): Observable<any> {
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?${this.api_key}&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false`);
  }
  getGenres() {
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?${this.api_key}&language=es-ES`);
  }
  getByGenre(genreId) {
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?${this.api_key}&language=es-ES&sort_by=release_date.desc&include_adult=false&vote_count.gte=100&release_date.gte=2019&with_genres=${genreId}`)
  }
  getById(movieId) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${movieId}?${this.api_key}&append_to_response=credits&language=es-ES`)
  }
  getByQuery(query) {
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?${this.api_key}&language=es-ES&query=${query}`)
  }
  getTrailer(movieId) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?${this.api_key}&language=es-ES`)
  }
  getActorsByQuery(query){
    return this.httpClient.get(`http://api.tmdb.org/3/search/person?${this.api_key}&query=${query}`)
  }
}
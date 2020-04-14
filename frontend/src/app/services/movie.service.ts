import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(public httpClient: HttpClient) { }

  getPopular(): Observable<any> {
    return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false');
  }
  getByGenre(genreId) {
    return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=release_date.desc&include_adult=false&vote_count.gte=100&release_date.gte=2019&with_genres=' + genreId)
  }
  getById(movieId) {
    return this.httpClient.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits&language=es-ES')
  }
  getByQuery(query) {
    return this.httpClient.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + query)
  }
}
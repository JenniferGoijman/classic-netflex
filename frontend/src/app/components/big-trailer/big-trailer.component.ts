import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-big-trailer',
  templateUrl: './big-trailer.component.html',
  styleUrls: ['./big-trailer.component.scss']
})
export class BigTrailerComponent implements OnInit {
  showTrailer;
  charged=false;

  constructor(public movieService: MovieService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }
  
  url() {
    const movieId = this.movieService.mostPopularMovie
    if (movieId && !this.charged) {
      this.movieService.showBigTrailer = true;
      this.movieService.getTrailer(movieId)
        .subscribe(res => {
          this.showTrailer = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1";
          console.log("RUNNING", res)
          this.charged = true;
        }, error => console.error(error));
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.showTrailer)
  }

  // getTrailer() {
  //   const movieId = this.movieService.mostPopularMovie
  //   if (movieId) {
  //     this.movieService.showBigTrailer = true;
  //     this.movieService.getTrailer(movieId)
  //       .subscribe(res => {
  //         this.showTrailer = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1";
  //         console.log(this.showTrailer)
  //       }, error => console.error(error));
  //   }
  // }
}

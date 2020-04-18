import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  showTrailer;

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  } 
}
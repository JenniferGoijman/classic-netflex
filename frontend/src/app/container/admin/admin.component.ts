import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  surname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit { 
  constructor() { }

  ngOnInit(): void {
    
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App, we will call the API in .NET 5 :D';
  users: any;

    /*Dependency Injection */
    constructor(private http: HttpClient) {}

    /*Call to the api, angular manages observables for async operations*/
    ngOnInit() {
      /* When the client is initialized, it calls the getUsers operation */
      this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;  
    }, error => {
      console.log(error);
    });
  }

}


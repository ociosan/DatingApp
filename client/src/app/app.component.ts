import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App, we will call the API in .NET 5 :D';
  users: any;

    /*Dependency Injection */
    constructor(private accountService: AccountService) {}

    /*Call to the api, angular manages observables for async operations*/
    ngOnInit() {
      /* When the client is initialized, it calls the getUsers operation */
      this.setCurrentUser();
  }


  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}


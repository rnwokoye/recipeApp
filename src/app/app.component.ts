import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';


  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBwCcOiVmXLY4w-_qiKg-SaqpXgQNPG4KA',
    authDomain: 'ng-recipebook-9b575.firebaseapp.com',

    });

  }


  onNavigate(feature: string) {
    this.loadedFeature = feature;

  }
}

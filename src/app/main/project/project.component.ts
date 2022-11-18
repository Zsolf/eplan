import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private fbService: FirebaseService) { }

  text: string;

  ngOnInit(): void {
    // This is a test for the database connection. Most of the database queries requires you to subsribe tot them which means
    // you wont get the data instantly, so you have to wait for it, but because of that the app is very responsive, since if you
    // change something it will change in the app too, because you are subscribed to the channel aka watching for changes.
    this.fbService.getPagesByProject('1').subscribe(result => {
      this.text = result[0].text + ' ' + result[1].text;
      console.log(result);
    });
  }

}

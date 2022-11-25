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
   this.fbService.getPagesByProject('1').subscribe(result => {
      this.text = result[0].text + ' ' + result[1].text;
    });
  }

}

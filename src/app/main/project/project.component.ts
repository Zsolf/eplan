import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import Firebase from 'firebase';
import { StorageService } from 'src/app/services/firebase-storage.service'; 
import { ProjectText } from 'src/app/models/project.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private fbService: FirebaseService, private stService: StorageService) { }

  projectId: string;
  title: string;
  tf: ProjectText;
  members: string;

  ngOnInit(): void {
    this.title="";
    this.tf={id:""} as ProjectText;
    

    this.fbService.getById("Projects", "1").subscribe(result => {
      this.projectId=result.id;
      this.tf.title=result.title;
      this.tf.id=result.id;
      this.tf.text=result.text;
      console.log(result);

    });
  }

  update(): void{
    if(this.tf.id==""){
      this.fbService.add("Projects", this.tf);

    }else{
    this.fbService.add("Projects", this.tf, this.tf.id);
    }
  }

}

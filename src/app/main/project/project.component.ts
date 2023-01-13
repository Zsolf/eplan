import {Component, DoCheck, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import Firebase from 'firebase';
import { StorageService } from 'src/app/services/firebase-storage.service';
import { IProject } from 'src/app/models/project.model';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, DoCheck {

  constructor(private fbService: FirebaseService, private stService: StorageService, private router:Router, public auth: AuthService) { }

  projectId: string;
  title: string;
  tf: IProject;
  members: string[];
  tasks: any[];
  progressCount: number;
  progress: number;

  ngOnInit(): void {
    this.title="";
    this.tf={id:""} as IProject;
    this.members = [];
    this.progressCount = 0;

    if(this.fbService.selectedProjectId != '') {
      this.fbService.getById("Projects", this.fbService.selectedProjectId).subscribe(result => {
        this.projectId = this.fbService.selectedProjectId
        this.tf = result;
        if (this.tf.members != '') {
          this.members = result.members.split(',');
          this.members.splice(this.members.indexOf(''));
        }

      });
      this.fbService.getTasksByProject(this.fbService.selectedProjectId).subscribe(res => {
        this.tasks = res;
        this.tasks.forEach(r => {
          if (r.status == "completed") {
            this.progressCount++;
          }
        });
        this.progress = 0;
        if (this.progressCount != 0) {
          this.progress = Math.ceil((this.progressCount / res.length) * 100);
        }
      });

    }
  }

  ngDoCheck(): void {
    if (this.projectId != this.fbService.selectedProjectId){
      if(this.fbService.selectedProjectId != '') {
        this.members = []
        this.fbService.getById("Projects", this.fbService.selectedProjectId).subscribe(result => {
          this.projectId = this.fbService.selectedProjectId
          this.tf = result;
          if (this.tf.members != '') {
            this.members = result.members.split(',');
            this.members.splice(this.members.indexOf(''));
          }
        });
        this.fbService.getTasksByProject(this.fbService.selectedProjectId).subscribe(res => {
          this.tasks = res;
          this.progressCount = 0;
          this.tasks.forEach(r => {
            if (r.status == "completed") {
              this.progressCount++;
            }
          });
          this.progress = 0;
          if (this.progressCount != 0) {
            this.progress = Math.ceil((this.progressCount / res.length) * 100);
          }
        });
      }else{
        this.projectId = '';
        this.tf.id = '';
        this.tf.members = '';
        this.tf.title = '';
        this.tf.text = '';
        this.members = [];
      }
    }
  }

  join(): void{
    this.members.push(this.auth.user.displayName);
  }

  leave(): void{
    this.members.splice(this.members.indexOf(this.auth.user.displayName));
  }

  update(): void{
    if (this.tf.id==""){
      this.tf.members = '';
      this.members.forEach(r => {
        this.tf.members = this.tf.members + r + ',';
      });
      this.fbService.add("Projects", this.tf);
      this.fbService.selectedComponent = '';
      this.members = [];
    }else{
      this.tf.members = '';
      this.members.forEach(r => {
        this.tf.members = this.tf.members + r + ',';
      });
      this.fbService.update("Projects", this.tf.id, this.tf);
      this.members = [];
    }
  }

  addPage(): void{
    this.fbService.selectedComponent = 'page';
    this.fbService.selectedPageId = '';
  }

  delete(): void{
    if (this.tf.id!="") {
      this.fbService.delete("Projects", this.projectId);
    }
    this.fbService.selectedComponent = '';
  }

}

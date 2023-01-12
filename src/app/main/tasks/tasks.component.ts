import {ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import Firebase from "firebase";
import { MatTableDataSource } from '@angular/material/table';
type Timestamp = Firebase.firestore.Timestamp;

export interface TaskInformation {
  title: string;
  position: number;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit, DoCheck {

  constructor(private fbService: FirebaseService) { }

  displayedColumns: string[] = ['demo-position', 'demo-title', 'demo-deadline'];
  elementOngoing: TaskInformation[] = [];
  elementCompleted: TaskInformation[] = [];
  dataSourceCompleted = new MatTableDataSource<any>();
  dataSourceOngoing = new MatTableDataSource<any>();

  text: string;
  taskTitle: string;
  taskStatus: string;
  taskDeadline: Date;
  tempDeadline: Date;
  taskID:string;
  i: number;
  iOngoing: number;
  iCompleted: number;
  projectId: string;

  ngOnInit(): void {

    this.updateTable();
    this.clearTask();
  }

  ngDoCheck(): void {
    if (this.projectId != this.fbService.selectedProjectId) {
      this.dataSourceCompleted = new MatTableDataSource<any>();
      this.dataSourceOngoing = new MatTableDataSource<any>();
      this.updateTable();
      this.clearTask();
    }
  }

  updateTable(){
    this.elementOngoing = [];
    this.elementCompleted = [];
    this.i = 0;
    this.iOngoing = 0;
    this.iCompleted = 0;
    this.fbService.getTasksByProject(this.fbService.selectedProjectId).subscribe(result => {
      this.projectId = this.fbService.selectedProjectId;
      while(result[this.i] != null){
        this.tempDeadline = new Date(result[this.i].deadline.seconds*1000);
        let t = {
          position: 1,
          title: result[this.i].title,
          deadline: (this.tempDeadline.getMonth() + 1) + '/' + this.tempDeadline.getDate() + '/' + this.tempDeadline.getFullYear(),
          status: result[this.i].status,
          id: result[this.i].id,
          description: result[this.i].description,
          taskDeadline: result[this.i].deadline
        }
        if(t.status == 'in progress'){
          t.position = t.position + this.iOngoing;
          this.elementOngoing.push(t);
          this.dataSourceOngoing.data = this.elementOngoing;
          this.iOngoing++;
        }
        else if(t.status == 'completed'){
          t.position = t.position + this.iCompleted;
          this.elementCompleted.push(t);
          this.dataSourceCompleted.data = this.elementCompleted;
          this.iCompleted++;
        }
        this.i++;
      }
    })
  }

  clearTask(){
    this.taskTitle = "";
    this.taskDeadline = null;
    this.text = "";
    this.taskStatus = "";
    this.taskID = "";
  }

  saveTask(){
    if(this.taskID != ""){
      if(this.text.includes("<p>")){
        this.text = this.text.substring(3, this.text.length - 4);
      }
      let task = {
        title: this.taskTitle,
        deadline: Firebase.firestore.Timestamp.fromDate(this.taskDeadline),
        description: this.text,
        status: this.taskStatus,
        id: this.taskID,
        project: this.fbService.selectedProjectId,
      }
      this.fbService.update('Tasks', this.taskID, task);
      this.updateTable();
      this.clearTask()
    }
  }

  createTask(){
    if(this.taskID == ""){
      let task = {
        title: this.taskTitle,
        deadline: Firebase.firestore.Timestamp.fromDate(this.taskDeadline),
        description: this.text.substring(3, this.text.length - 4),
        status: this.taskStatus,
        project: this.fbService.selectedProjectId,
      }
      this.fbService.add('Tasks', task);
      this.updateTable();
    }
  }

  deleteTask(){
    if(this.taskID != ""){
      this.fbService.delete('Tasks', this.taskID);
      this.clearTask();
      this.updateTable();
    }
  }

  selectTask(element: any){
    this.taskDeadline = new Date(element.taskDeadline.seconds*1000);
    this.taskTitle = element.title;
    this.text = element.description;
    this.taskStatus = element.status;
    this.taskID = element.id;
  }
}

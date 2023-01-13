import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TreeNode} from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/angular';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {FirebaseService} from '../services/firebase.service';
import {IPage} from '../models/pagemodel';
import {IProject} from '../models/project.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {

  files: TreeNode[];

  displayedName: string;

  node1: TreeNode;
  node2: TreeNode;
  node3: TreeNode;

  pages = new Map<IProject, any[]>();

  selectedItem: any;
  node: TreeNode[];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next'
    },
  };

  constructor(public afAuth: AngularFireAuth, private router: Router, public fb: FirebaseService) {
    this.fb.selectedComponent = 'main';
    this.afAuth.authState.subscribe((user) => {
      this.displayedName = user.displayName;
    });
  }


  itemSelect(event): void {
      this.fb.selectedComponent = this.selectedItem.data;
      if (this.selectedItem.data == 'page'){
        this.fb.selectedPageId = this.selectedItem.id;
      }else{
        this.fb.selectedProjectId = this.selectedItem.id;
      }
  }

  newProject(): void{
    this.fb.selectedComponent = 'project';
    this.fb.selectedProjectId = '';
    console.log(this.fb.selectedProjectId);
  }

  reload(): void {
    this.fb.selectedComponent = 'main';
  }

  ngOnInit(): void {
    this.fb.getAll('Projects').subscribe(result => {
      this.files = [];
      this.pages.clear();
      result.forEach(project => {
        this.pages.set(project, []);
        let i = 1;
        this.fb.getPagesByProject(project.id).subscribe(res => {
          res.forEach(page => {
            let dupla = false;
            this.pages.get(project).forEach( r => {
              if ( r.id == page.id){
                dupla = true;
              }
            });
            if (dupla == false) {
              this.pages.get(project).push({label: 'Page ' + i, data: 'page', id: page.id});
              i++;
            }
          });
        });
      });
      this.files = [];
      // tslint:disable-next-line:typedef
      this.pages.forEach((value, key) => {
        let node1 = {
          label: key.title, expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder',
          data: 'project', id: key.id,
          children: [{label: 'Tasks', data: 'task', id: key.id},
            {
              label: 'Pages', expandedIcon: 'pi pi-check-circle', collapsedIcon: 'pi pi-circle', data: 'project', id: key.id,
              children: value
            }]
        };

        this.files.push(node1);
      });
    });
  }

  ngDoCheck(): void {
    if (this.fb.newData == true){
      this.pages.clear();
      this.fb.newData = false;
    }

    if(this.fb.needRefresh == true){
      this.fb.setRefresh();
      this.ngOnInit();
    }
  }


  logOut(): any {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}

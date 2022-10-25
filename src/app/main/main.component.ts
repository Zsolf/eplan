import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  files1: TreeNode[];

  node1: TreeNode;
  node2: TreeNode;
  node3: TreeNode;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next'
    },
  };

  constructor() { }

  ngOnInit(): void {
    this.files1 = [];
    this.node1 = { label: 'Project 1',  expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder',
      children: [{label: 'Tasks'},
        {label: 'Pages', expandedIcon: 'pi pi-check-circle', collapsedIcon: 'pi pi-circle',
          children: [{label: 'Page 1'}, {label: 'Page 2'}, {label: 'Page 3'}]}]};

    this.node2 = { label: 'Project 2', expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder',
      children: [{label: 'Tasks'},
        {label: 'Pages',  expandedIcon: 'pi pi-check-circle', collapsedIcon: 'pi pi-circle',
          children: [{label: 'Page 1'}, {label: 'Page 2'}, {label: 'Page 3'}]}]};

    this.node3 = { label: 'Project 3', expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder',
      children: [{label: 'Tasks'},
        {label: 'Pages',  expandedIcon: 'pi pi-check-circle', collapsedIcon: 'pi pi-circle',
          children: [{label: 'Page 1'}, {label: 'Page 2'}, {label: 'Page 3'}]}]};

    this.files1.push(this.node1);
    this.files1.push(this.node2);
    this.files1.push(this.node3);
  }

}

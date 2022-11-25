import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/angular';
import {Router} from '@angular/router';

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

  selectedItem: TreeNode;

  selectedComponent: string;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next'
    },
  };

  constructor() {
    this.selectedComponent = 'main';
  }


  itemSelect(event): void {
      this.selectedComponent = this.selectedItem.data;
  }

  reload(): void {
    this.selectedComponent = 'main';
  }

  ngOnInit(): void {
    this.files1 = [];
    this.node1 = { label: 'Project 1',  expandedIcon: 'pi pi-folder-open', collapsedIcon: 'pi pi-folder', data: 'project',
      children: [{label: 'Tasks', data: 'task'},
        {label: 'Pages', expandedIcon: 'pi pi-check-circle', collapsedIcon: 'pi pi-circle',
          children: [{label: 'Page 1', data: 'page'}, {label: 'Page 2', data: 'page'}, {label: 'Page 3', data: 'page'}]}]};

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

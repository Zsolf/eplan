import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {TreeModule} from 'primeng/tree';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatDividerModule} from '@angular/material/divider';
import { ProjectComponent } from './project/project.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditorModule} from 'primeng/editor';
import {ProgressBarModule} from 'primeng/progressbar';
import {MatButtonModule} from '@angular/material/button';

FullCalendarModule.registerPlugins([
  dayGridPlugin
]);

@NgModule({
  declarations: [MainComponent, ProjectComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    TreeModule,
    FullCalendarModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    EditorModule,
    ProgressBarModule,
    MatButtonModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }

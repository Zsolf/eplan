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
import { PageComponent } from './page/page.component';
import {AppRoutingModule} from '../app-routing.module';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { TasksComponent } from './tasks/tasks.component';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



FullCalendarModule.registerPlugins([
  dayGridPlugin
]);

@NgModule({
  declarations: [MainComponent, ProjectComponent, PageComponent, TasksComponent],
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
    MatButtonModule,
    AppRoutingModule,
    FileUploadModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers:[
    MatDatepickerModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }

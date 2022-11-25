import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PageComponent} from './main/page/page.component';
import {ProjectComponent} from './main/project/project.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }]



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

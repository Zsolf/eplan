import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PageComponent} from './main/page/page.component';
import {ProjectComponent} from './main/project/project.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }]



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

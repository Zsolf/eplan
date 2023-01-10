import { Injectable } from '@angular/core';
import app from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  constructor(public afAuth: AngularFireAuth, private router: Router, private fb: FirebaseService) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
  // Sign in with Google
  // tslint:disable-next-line:typedef
  GoogleAuth() {
    return this.AuthLogin(new app.auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  // tslint:disable-next-line:typedef
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.user = result.user;
        this.createUserData(result.user);
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createUserData(user: app.User): void {
      this.fb.getById('User', user.email).subscribe(result => {
        if (result === undefined){
          const newUser = {displayName: user.displayName, id: user.email, email: user.email, phoneNumber: user.phoneNumber};
          this.fb.add('Users', newUser, user.email);
        }
      });
  }
}

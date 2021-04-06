// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Firebase
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Models
import { User } from '@auth/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User;

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.emailVerified ?? false;
  }


  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) {

    // Saving user data in local storage when
    // logged in and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  logIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  register(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationMail(): Promise<void> {
    (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  forgotPassword(passwordResetEmail: string): void {
    this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  googleAuth(): void {
    this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider): void {
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['app']);
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Setting up user data when sign in with username/password,
  // sign up with username/password and sign in with social auth
  // provider in Firestore database using AngularFirestore + AngularFirestoreDocument
  setUserData(user): void {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    userRef.set(userData, {
      merge: true
    });

    this.showMessage('Logged in');
  }

  showMessage(message: string): void {
    this.snackBar.open(message, null, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  logOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.showMessage('Logged out');
      this.router.navigate(['']);
    });
  }
}

// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// rxjs
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
  user: User;

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

    const userDoc = this.afAuth.authState.pipe(
      switchMap((user: firebase.User): Observable<User> => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    // Saving user data in local storage when
    // logged in and setting up null when logged out
    userDoc.subscribe((user: User) => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      JSON.parse(localStorage.getItem('user'));
    });
  }

  logIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['']);
        this.setUserData(result.user, 'Logged in');
      }).catch((error) => {
        this.showMessage(error.message);
      });
  }

  register(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(
          result.user,
          'Account created! Please verify your account by following the link set to you via email'
        );
      }).catch((error) => {
        this.showMessage(error.message);
      });
  }

  async sendVerificationMail(): Promise<void> {
    (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['']);
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
        this.router.navigate(['']);
        this.setUserData(result.user, 'Logged in');
      }).catch((error) => {
        this.showMessage(error.message);
      });
  }

  // Setting up user data when sign in with username/password,
  // sign up with username/password and sign in with social auth
  // provider in Firestore database using AngularFirestore + AngularFirestoreDocument
  setUserData(user: firebase.User, message: string): void {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };

    // firestore doc will be overwritten, so don't set data that could be null
    if (user.displayName) {
      userData.displayName = user.displayName;
    }
    if (user.photoURL) {
      userData.photoURL = user.photoURL;
    }

    userRef.set(userData, {
      merge: true
    });

    this.showMessage(message);
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

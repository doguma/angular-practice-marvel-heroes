import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';

import { FirebaseApp } from '@firebase/app-types';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import 'rxjs/add/operator/switchMap'

interface User {
  nickname: string;
  age: number;
  likedHeroes: likedHero[];
}

interface likedHero {
  name: string;
  image: string;
  likedTime: string;
}

@Injectable()
export class AuthenticationService {

  authState: any = null;
  user;
  userinfo;
  public authInfo: Observable<firebase.User>;

  likedHeroesCollection: AngularFirestoreCollection<likedHero>;
  likedHeroes: Observable<likedHero[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 

    this.authInfo = this.afAuth.authState;

    this.user = this.afAuth.authState
    .switchMap(user => {
      if (user){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return Observable.of(null)
      }
    })

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });


  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest'}
    else if (this.currentUserAnonymous) { return 'Anonymous'}
    else { return this.authState['displayName' ] || 'User without a Name'}
  }



  // addLikedHero (hero: Hero, param: string){
  //   this.likedHeroesCollection = this.afs.collection(`users/${user.uid}/likedHeroes`, ref => ref.orderBy('name', 'asc'));
    
  //   this.likedHeroesCollection.add(hero);
  // }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => { console.log(user);
      });
  }

  updateUserData(user: User){
    this.user = this.authInfo;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentUserId}`);

    return userRef.update({
      nickname: this.authState.nickname,
      age: this.authState.age
    })
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      console.log('logged out') 
    });
  }
}

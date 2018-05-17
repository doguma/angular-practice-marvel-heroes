import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';


@Injectable()
export class HeroService {

  marvelsCollection: AngularFirestoreCollection<Hero>;

  
  marvels: Observable<Hero[]>;
  marvelDoc: AngularFirestoreDocument<Hero>;
  marvel: Observable<Hero>;
  
  constructor(private afs: AngularFirestore, private messageService: MessageService){
    
    

    this.marvelsCollection = this.afs.collection('marvels', ref => ref.orderBy('name', 'asc'));

    this.marvels = this.marvelsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Hero;
        data.id = a.payload.doc.id;
        return data;
      });
    });
      }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getHeroes(): Observable<Hero[]>{
    return this.marvels;
  }

  addHero (hero: Hero){
    hero.image = "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png";
    this.marvelsCollection.add(hero);
  }


  deleteHero(hero: Hero){
    this.marvelDoc = this.afs.doc(`marvels/${hero.id}`);
    this.marvelDoc.delete();
  }

  updateHero(hero: Hero, param: string){
    this.marvelDoc = this.afs.doc(`marvels/${param}`);
    this.marvelDoc.update(hero);
  }

  getHero(id: string){
    var marvelDoc = this.afs.doc(`marvels/${id}`);
    return marvelDoc.valueChanges();

  }
}
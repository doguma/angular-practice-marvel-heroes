import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  hero: Hero = {
    id: null,
    name: '',
    subtitle: '',
    content: '',
    image: ''
  }

  hello: Subscription;
  user;

  constructor(private heroService: HeroService, private router: Router, public snackBar: MatSnackBar, public auth: AuthenticationService) {
    this.user = auth.authInfo;
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.hello = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }


  gotodetail(id: number){
    this.router.navigate(['detail', id]);
  }

  onSubmit() {
    if (this.hero.name != '' && this.hero.subtitle != '' && this.hero.content != '') {
      this.heroService.addHero(this.hero);
      this.openSnackBar(`added hero: ${this.hero.name}!`, "close")
      
      this.hero.name = '';
      this.hero.subtitle = '';
      this.hero.content = '';
    }
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero);
    this.openSnackBar(`deleted hero: ${hero.name}!`, "close")
  }

  // likehero(hero: Hero){
  //   this.auth.addLikedHero(hero, this.hero.id);
  // }


  openSnackBar( message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.hello.unsubscribe();
  }
}

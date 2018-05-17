import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy{
  @Input() hero: Hero;

  heroes: Hero[];
  hello: Subscription;

  id: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute, 
    private heroService: HeroService, 
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
      const id: string = this.route.snapshot.paramMap.get('id');
      this.hello = this.heroService.getHero(id)
      .subscribe(v =>{
        this.hero = v;
      })
  }

  goBack(): void{
    this.router.navigate(['dashboard']);
  }

  onSubmit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (this.hero.name != '' && this.hero.subtitle != '' && this.hero.content != '' && this.hero.image != '') {
      this.heroService.updateHero(this.hero, id);
    }
  }

  ngOnDestroy() {
    this.hello.unsubscribe();
  }
}

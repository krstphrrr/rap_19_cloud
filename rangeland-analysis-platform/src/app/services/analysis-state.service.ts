import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class AnalysisStateService implements OnInit {
  public activeAnalysis: BehaviorSubject<string>;
  public cache: BehaviorSubject<any>;

  constructor(private router: Router) {
    const queryParams = this.router.parseUrl(this.router.url).queryParams, cache = {};
    (queryParams['cache'] || '').split(',').map((k) => {
        if (k) {
          cache[k] = true;
        }
    });
    this.activeAnalysis = new BehaviorSubject<string>(queryParams['analysis']);
    this.cache = new BehaviorSubject<any>(cache);
    this.cache.subscribe(v => {
      console.log(v);
    })
  }

  public setCache(key, value) {
    const cache = this.cache.value;
    cache[key] = value;
    this.cache.next(cache);
  }

  ngOnInit() {

  }
}

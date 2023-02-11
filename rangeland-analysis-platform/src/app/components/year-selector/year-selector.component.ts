import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, RoutingService, MapStateService, Overlay} from 'app/components';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  @Input() overlay: Overlay;
  @Output() overlayChange = new EventEmitter<Overlay>();

  constructor(
    private router: Router,
    private routing: RoutingService,
    private mapState: MapStateService) {
  }

  setYear(year: number) {
    const params = {};
    params[`${this.overlay.id}_y`] = year;
    this.overlay.year = year;

    this.routing.updateUrlParams(params);
    if (this.overlay.visible) {
      this.mapState.setOverlay(this.overlay)
    }
  }

  ngOnInit() {
    this.routing.url.subscribe(q => {
      const queryParams = this.router.parseUrl(q).queryParams;
      if (queryParams[`${this.overlay.id}_y`]) {
        this.overlay.year = parseInt(queryParams[`${this.overlay.id}_y`], 10);
      }
    });
  }

}

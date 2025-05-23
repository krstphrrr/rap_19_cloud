import { Component,  EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Overlay, Router} from 'app/components';
import { RoutingService } from 'app/services/routing.service';
import { MapStateService } from 'app/services/map-state.service';

@Component({
    selector: 'app-opacity-control',
    templateUrl: './opacity-control.component.html',
    styleUrls: ['./opacity-control.component.css'],
    standalone: false
})
export class OpacityControlComponent implements OnInit {

  @Input() overlay: Overlay;
  @Output() overlayChange =  new EventEmitter<Overlay>();

  constructor(private router: Router, private routing: RoutingService, private mapState: MapStateService) { }

  public setOpacity(value:number) {
    // console.log(value)
    if (value >= 0) {
      this.overlay.opacity = value / 100;
      const params = {};
      params[this.overlay.id + '_o'] = this.overlay.opacity;
      if (this.overlay.visible) {
        this.mapState.removeOverlay(this.overlay)
        this.mapState.setOverlay(this.overlay)
      }
      this.routing.updateUrlParams(params);
    }
  }


  ngOnInit() {
    const params = this.router.parseUrl(this.router.url).queryParams
    this.overlay.opacity = parseFloat(params[this.overlay.id + '_o']) || this.overlay.opacity || 0.6;
    if (this.overlay.visible) {
      this.mapState.setOverlay(this.overlay);
    }
  }

}

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
    const params = this.router.parseUrl(this.router.url).queryParams;
    
    // Always read opacity from URL if available, otherwise use overlay default
    const urlOpacity = parseFloat(params[this.overlay.id + '_o']);
    if (!isNaN(urlOpacity)) {
      this.overlay.opacity = urlOpacity;
      
      // If overlay is visible, update it on the map to apply the opacity
      if (this.overlay.visible) {
        // Use setTimeout to ensure this happens after all component initialization
        setTimeout(() => {
          this.mapState.removeOverlay(this.overlay);
          this.mapState.setOverlay(this.overlay);
        }, 0);
      }
    } else if (this.overlay.opacity === undefined) {
      // Set default opacity if not already set
      this.overlay.opacity = 0.6;
    }
  }

}

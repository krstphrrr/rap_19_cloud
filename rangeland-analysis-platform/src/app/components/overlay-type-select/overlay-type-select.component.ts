import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { RoutingService, Router, Overlay, OverlayType, MapStateService} from 'app/components'

@Component({
    selector: 'app-overlay-type-select',
    templateUrl: './overlay-type-select.component.html',
    styleUrls: ['./overlay-type-select.component.css'],
    standalone: false
})
export class OverlayTypeSelectComponent implements OnInit {

  @Input() overlay: Overlay;
  @Output() overlayChange =  new EventEmitter<Overlay>();

  constructor(private router: Router, private routing: RoutingService, private mapState: MapStateService) { 

  }

   public setOverlayType(overlay_type: OverlayType) {

    this.overlay.selected_type = overlay_type;

    if (this.overlay.visible) {
      this.mapState.setOverlay(this.overlay);
    } else {
      this.mapState.removeOverlay(this.overlay);
    }
    const params = {};
    params[this.overlay.id + '_t'] = this.overlay.selected_type.id;
    this.routing.updateUrlParams(params);
  }

  ngOnInit() {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;

    if (this.overlay.overlay_types && queryParams[this.overlay.id + '_t']) {
      this.overlay.selected_type = this.overlay.overlay_types.find(
        (type: OverlayType) => type.id === queryParams[this.overlay.id + '_t']
      )
    }
    // console.log(this.overlay.selected_type); 
    if (this.overlay.selected_type) {
      this.setOverlayType(this.overlay.selected_type)
    }
  }

}

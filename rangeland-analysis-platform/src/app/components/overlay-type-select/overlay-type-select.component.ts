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

  constructor(private router: Router, private routing: RoutingService, private mapState: MapStateService) {  }   public setOverlayType(overlay_type: OverlayType, skipLayerOrderUpdate: boolean = false) {

    this.overlay.selected_type = overlay_type;

    if (this.overlay.visible) {
      this.mapState.setOverlay(this.overlay);
      
      // Only update URL parameter if overlay is visible
      const params = {};
      params[this.overlay.id + '_t'] = this.overlay.selected_type.id;
      
      // Update layer order when changing type (this moves layer to top) unless in initialization
      if (!skipLayerOrderUpdate) {
        const visibleOverlays = this.mapState.getVisibleOverlays();
        if (visibleOverlays.length > 0) {
          params['layer_order'] = visibleOverlays.map(o => o.id).join(',');
        }
      }
      
      this.routing.updateUrlParams(params);
    } else {
      this.mapState.removeOverlay(this.overlay);
    }  }

  ngOnInit() {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;

    if (this.overlay.overlay_types && queryParams[this.overlay.id + '_t']) {
      this.overlay.selected_type = this.overlay.overlay_types.find(
        (type: OverlayType) => type.id === queryParams[this.overlay.id + '_t']
      )
    }
    
    // Only set overlay type if there's a URL parameter for it OR if the overlay is visible
    // Skip layer order update during initialization to preserve URL order
    if (this.overlay.selected_type && (queryParams[this.overlay.id + '_t'] || this.overlay.visible)) {
      this.setOverlayType(this.overlay.selected_type, true)
    }
  }

}

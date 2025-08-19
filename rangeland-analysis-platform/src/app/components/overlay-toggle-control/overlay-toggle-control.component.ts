import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Overlay, DataLayer, Router, MapStateService, RoutingService } from 'app/components';
import { OverlayType } from 'app/services/overlays.service';

@Component({
    selector: 'app-overlay-toggle-control',
    templateUrl: './overlay-toggle-control.component.html',
    styleUrls: ['./overlay-toggle-control.component.css'],
    standalone: false
})
export class OverlayToggleControlComponent implements OnInit {

  @Input() overlay: Overlay;
  @Output() overlayChange =  new EventEmitter<Overlay>();

  constructor(private router: Router, private routing: RoutingService, private mapState: MapStateService) {   }  public toggleOverlay(event: any, skipLayerOrderUpdate: boolean = false) {

    this.overlay.visible = event && event.checked;
    if (this.overlay.visible) {
        // When a layer is turned on, put it on top by not specifying index
        this.mapState.setOverlay(this.overlay);
      } else {
        this.mapState.removeOverlay(this.overlay);
    }

    // Update URL parameters in a single call including layer order
    const params = {};
    params[this.overlay.id + '_v'] = this.overlay.visible;
    
    // If turning off, also clean up layer-specific parameters
    if (!this.overlay.visible) {
      params[this.overlay.id + '_t'] = null;  // layer type
      params[this.overlay.id + '_o'] = null;  // opacity
      params[this.overlay.id + '_y'] = null;  // year
    }
    
    // Update layer order unless we're in initialization mode
    if (!skipLayerOrderUpdate) {
      const visibleOverlays = this.mapState.getVisibleOverlays();
      if (visibleOverlays.length > 0) {
        params['layer_order'] = visibleOverlays.map(o => o.id).join(',');
      } else {
        params['layer_order'] = null; // Remove layer_order if no layers visible
      }
    }
    
    this.routing.updateUrlParams(params);  }
  ngOnInit() {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    
    // Check if this overlay has any URL parameters (suggesting it should be visible)
    const hasLayerParams = queryParams[this.overlay.id + '_v'] !== undefined ||
                          queryParams[this.overlay.id + '_t'] !== undefined ||
                          queryParams[this.overlay.id + '_o'] !== undefined ||
                          queryParams[this.overlay.id + '_y'] !== undefined;

    // Check if this overlay is mentioned in the layer_order parameter
    const isInLayerOrder = queryParams['layer_order'] && 
                          queryParams['layer_order'].split(',').includes(this.overlay.id);

    if (hasLayerParams || isInLayerOrder) {
      // If there are layer-specific parameters OR if mentioned in layer_order, use explicit visibility or default to true
      this.overlay.visible = queryParams[this.overlay.id + '_v'] === 'true' || 
                            (queryParams[this.overlay.id + '_v'] === undefined);
    }
    // Otherwise, use the overlay's default visibility setting

    // Skip layer order update during initialization to preserve URL order
    this.toggleOverlay({checked: this.overlay.visible}, true)
  }

}
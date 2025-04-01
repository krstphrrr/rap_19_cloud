import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'app/services/routing.service';
import { AnalysisService } from 'app/services/analysis.service';
import { MapStateService } from 'app/services/map-state.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: false
})

export class LayoutComponent  {
  /*
   * The main routed component
   */
  public leftToggle = true;
  public rightToggle = true;
  public tabIndex = 0;

  constructor(
    private router: Router,
    private routing: RoutingService,
    public analysis: AnalysisService,
    private mapState: MapStateService
  ) {
    this.routing.url.subscribe(u => u ||
      this.router.navigateByUrl('') )
    const params = this.routing.getParams();
    if (params['tab']) {
      this.tabIndex = params['tab'];
    }

  }
   tabIndexChanged(index) {
    this.mapState.clearMap();
    this.analysis.resetAnalysis(true, true);
    this.routing.updateUrlParams({
      tab: index, fid: null
    });
   }
}

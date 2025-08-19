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
  public isMobile = false;
  public showControls = false;
  public showAnalysis = false;

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

    // Initialize mobile detection
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // If switching from mobile to desktop, reset panel states
    if (wasMobile && !this.isMobile) {
      this.showControls = false;
      this.showAnalysis = false;
    }
  }

  toggleControls() {
    this.showControls = !this.showControls;
    this.showAnalysis = false; // Close analysis when opening controls
  }

  toggleAnalysis() {
    this.showAnalysis = !this.showAnalysis;
    this.showControls = false; // Close controls when opening analysis
  }
   tabIndexChanged(index) {
    this.mapState.clearMap();
    this.analysis.resetAnalysis(true, true);
    this.routing.updateUrlParams({
      tab: index, fid: null
    });
   }
}

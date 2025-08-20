import { Component, ViewChildren, QueryList, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'app/services/routing.service';
import { AnalysisService } from 'app/services/analysis.service';
import { MapStateService } from 'app/services/map-state.service';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: false
})

export class LayoutComponent implements OnDestroy {
  /*
   * The main routed component
   */
  public leftToggle = true;
  public rightToggle = true;
  public tabIndex = 0;
  public isMobile = false;
  public showControls = false;
  public showAnalysis = false;
  
  @ViewChildren(MatSelect) matSelects!: QueryList<MatSelect>;
  private clickListener?: () => void;
  constructor(
    private router: Router,
    private routing: RoutingService,
    public analysis: AnalysisService,
    private mapState: MapStateService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.routing.url.subscribe(u => u ||
      this.router.navigateByUrl('') )
    const params = this.routing.getParams();
    if (params['tab']) {
      this.tabIndex = params['tab'];
    }    // Initialize mobile detection
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    
    // Set up document click listener for mobile dropdown management
    this.setupDropdownClickListener();
    
    // Initialize body class
    this.updateBodyClass();
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }  private setupDropdownClickListener() {
    if (typeof document !== 'undefined') {
      this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
        // Only handle clicks when mobile panels are visible
        if (!this.isMobile || (!this.showControls && !this.showAnalysis)) {
          return;
        }
        
        const target = event.target as HTMLElement;
        console.log('Document click:', target, event);
        
        // Check if there are any open dropdowns
        const openDropdowns = document.querySelectorAll('.mat-select-panel');
        if (openDropdowns.length === 0) return;
        
        // Be more selective about closing dropdowns - only close on backdrop clicks
        const isBackdropClick = target.classList.contains('cdk-overlay-backdrop');
        const isOutsidePanels = !target.closest('.controls-panel') && !target.closest('.analysis-panel');
        
        console.log('Dropdown management:', { isBackdropClick, isOutsidePanels, openDropdowns: openDropdowns.length });
        
        // Only close dropdowns if clicking on backdrop or completely outside panels
        if (isBackdropClick || isOutsidePanels) {
          console.log('Closing dropdowns');
          this.closeAllDropdowns();
        }
      });
    }
  }
  private checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // If switching from mobile to desktop, reset panel states
    if (wasMobile && !this.isMobile) {
      this.showControls = false;
      this.showAnalysis = false;
      this.closeAllDropdowns();
    }
    
    this.updateBodyClass();
  }toggleControls() {
    // Always close dropdowns before toggling panels
    this.closeAllDropdowns();
    
    this.showControls = !this.showControls;
    this.showAnalysis = false; // Close analysis when opening controls
    
    this.updateBodyClass();
  }

  toggleAnalysis() {
    // Always close dropdowns before toggling panels
    this.closeAllDropdowns();
    
    this.showAnalysis = !this.showAnalysis;
    this.showControls = false; // Close controls when opening analysis
    
    this.updateBodyClass();
  }
  
  private updateBodyClass() {
    if (typeof document !== 'undefined') {
      const body = document.body;
      if (this.isMobile && (this.showControls || this.showAnalysis)) {
        body.classList.add('mobile-panels-visible');
      } else {
        body.classList.remove('mobile-panels-visible');
      }
    }
  }  private closeAllDropdowns() {
    try {
      // Method 1: Close via MatSelect components if available (preferred)
      if (this.matSelects && this.matSelects.length > 0) {
        this.matSelects.forEach(select => {
          if (select.panelOpen) {
            select.close();
          }
        });
      }
      
      // Method 2: Fallback - trigger ESC key to close any remaining dropdowns
      const overlayContainer = document.querySelector('.cdk-overlay-container');
      if (overlayContainer) {
        const selectPanels = overlayContainer.querySelectorAll('.mat-select-panel');
        if (selectPanels.length > 0) {
          // Simulate ESC key press to close dropdowns
          const escEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
            keyCode: 27,
            which: 27,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(escEvent);
        }
      }
    } catch (error) {
      console.warn('Error closing dropdowns:', error);
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

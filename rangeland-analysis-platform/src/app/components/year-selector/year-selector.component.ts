import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router, RoutingService, MapStateService, Overlay} from 'app/components';

@Component({
    selector: 'app-year-selector',
    templateUrl: './year-selector.component.html',
    styleUrls: ['./year-selector.component.css'],
    standalone: false
})
export class YearSelectorComponent implements OnInit {

  @Input() overlay: Overlay;
  @Output() overlayChange = new EventEmitter<Overlay>();
  @ViewChild('matSelect') matSelect: MatSelect;
  
  private clickListener: (event: Event) => void;
  private isClosing = false; // Debounce flag

  constructor(
    private router: Router,
    private routing: RoutingService,
    private mapState: MapStateService) {
  }  onSelectOpened() {
    // Add click listener to document when dropdown opens
    this.isClosing = false; // Reset debounce flag
    
    setTimeout(() => {
      this.clickListener = (event: Event) => {
        // Prevent multiple rapid close/open cycles
        if (this.isClosing) {
          event.stopPropagation();
          event.preventDefault();
          return;
        }

        const target = event.target as Element;
        const panel = document.querySelector('.mat-select-panel');
        
        // Check if click is on any part of the mat-select component or its children
        const matFormField = target.closest('.mat-mdc-form-field') || target.closest('.mat-form-field');
        const matSelect = target.closest('.mat-mdc-select') || target.closest('.mat-select');
        const matSelectTrigger = target.closest('.mat-mdc-select-trigger') || target.closest('.mat-select-trigger');
        const matSelectValue = target.closest('.mat-mdc-select-value') || target.closest('.mat-select-value');
        const matSelectArrow = target.closest('.mat-mdc-select-arrow') || target.closest('.mat-select-arrow');
        
        // Check if click is on trigger or any of its related elements
        const isOnTrigger = matFormField || matSelect || matSelectTrigger || matSelectValue || matSelectArrow;
        
        // Check if click is on panel or any of its child elements  
        const isOnPanel = panel && (panel.contains(target) || target.closest('.mat-select-panel'));
        
        // If click is on the trigger elements (toggle behavior), close the dropdown
        if (isOnTrigger && !isOnPanel) {
          this.isClosing = true;
          event.stopPropagation();
          event.preventDefault();
          this.matSelect.close();
        }
        // If click is outside both the panel and all trigger-related elements, close the dropdown
        else if (!isOnPanel && !isOnTrigger) {
          this.isClosing = true;
          this.matSelect.close();
        } 
      };
      document.addEventListener('click', this.clickListener, true);
    }, 100); // Small delay to avoid immediate conflicts
  }
  onSelectClosed() {
    // Remove click listener when dropdown closes
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener, true);
      this.clickListener = null;
    }
    
    // Reset debounce flag after a short delay to allow for proper closing
    setTimeout(() => {
      this.isClosing = false;
    }, 200);
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

import { Component, OnInit, Input} from '@angular/core';
import { Overlay } from 'app/services/overlays.service';

@Component({
    selector: 'app-overlay-legend',
    templateUrl: './overlay-legend.component.html',
    styleUrls: ['./overlay-legend.component.css'],
    standalone: false
})
export class OverlayLegendComponent implements OnInit {

  @Input() overlay: Overlay;
  constructor() { }

  ngOnInit() {
  }

}

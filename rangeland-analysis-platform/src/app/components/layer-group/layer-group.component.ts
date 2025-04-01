import { Component, OnInit, Input} from '@angular/core';
import { Overlay } from 'app/services/overlays.service';
import { DataLayer } from 'app/services/data-layers.service';

@Component({
    selector: 'app-layer-group',
    templateUrl: './layer-group.component.html',
    styleUrls: ['./layer-group.component.css'],
    standalone: false
})
export class LayerGroupComponent implements OnInit {
  @Input() overlays: (Overlay | DataLayer)[]
  constructor() { }

  ngOnInit() {
  }

}

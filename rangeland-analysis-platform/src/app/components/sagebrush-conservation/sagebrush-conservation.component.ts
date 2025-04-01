import { Component, OnInit } from '@angular/core';
import { Router, Overlay, LegendOptions } from 'app/components';
import { Helpers } from 'app/classes/helpers';
import { DataLayer } from 'app/services/data-layers.service';


@Component({
    selector: 'app-sagebrush-conservation',
    templateUrl: './sagebrush-conservation.component.html',
    styleUrls: ['./sagebrush-conservation.component.css'],
    standalone: false
})
export class SagebrushConservationComponent implements OnInit {
  overlays = [
    new Overlay({
      id: 'ann_hc',
      opacity: 0.6,
      name: 'Annual herbaceous cover',
      selected_type: {
        tileurl: 'https://storage.googleapis.com/rap-tiles-sagebrush-annuals/annuals/{z}/{x}/{y}.png',
        legend: new LegendOptions('', '0', '>60%',  ['#90ee90','#ffea00', '#ffa500','#b30000'])
      },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng( 34.278795536178215 ,  -122.11635817236834 ),
        new google.maps.LatLng( 49.0318570886661 ,  -102.25998255818793 )),
      visible: false,
      help: `Average percent cover of herbaceous annuals across the sagebrush biome
            (2016-2018). Three large-scale datasets were combined to produce this
            data layer. 30m resolution.`,
      }),
    new Overlay({
      id: 'eco_rr',
      opacity: 0.6,
      name: 'Ecosystem resilience and resistance',
      selected_type: {
        tileurl: 'https://storage.googleapis.com/rap-tiles-sagebrush-rr/rr/{z}/{x}/{y}.png',
        legend: new LegendOptions('', null,null,null,
        [{label: 'LOW', color: '#e60000'},
        {label: 'MODERATE', color: '#ff0'},
        {label: 'HIGH', color: '#5497d4'},
        ])
      },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng( 34.284495364767494 ,  -122.11599407366981 ),
        new google.maps.LatLng( 49.02732568703994 ,  -102.26016714976637 )),
      visible: false,
      help: `Index of relative ecosystem resilience to disturbance and
             resistance to cheatgrass based on underlying soil temperature and
             moisture regimes across sage grouse management zones.`,
    }),
    new Overlay({
      id: 'cat_tc',
      opacity: 0.6,
      name: 'Categorical tree cover',
      selected_type: {
        tileurl: 'https://storage.googleapis.com/rap-tiles-sagebrush-categorical-tree/{year}/{z}/{x}/{y}.png',
        legend: new LegendOptions('', null, null, null,
        [{label: '0-1%', color: '#A6D4B2'},
        {label: '2-10%', color: '#F0E442'},
        {label: '11-20%', color: '#E69F00'},
        {label: '>=21%', color: '#AB0B0B'}])
      },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng( 34.29209793511018 ,  -122.11583836912726 ),
        new google.maps.LatLng( 49.00146205984823 ,  -102.26029001915217 )),
      visible: false,
      help: `Categorical tree cover across the sagebrush biome. Categorization
            performed with the rangeland cover product. 30m resolution`,
      years: Helpers.range(1984, 2021).reverse()
    }),
      new DataLayer({
        id: 'sg_pac',
        name: 'Sage Grouse Priority Areas for Conservation',
        visible: false,
        url: 'assets/data/sageGrousePAC.zip',
        style: {
          fillColor: null,
          fillOpacity: 0,
          strokeWeight: 2,
          strokeColor: 'darkred',
          strokeOpacity: 0.6
        }}),
      new DataLayer({
        id: 'sg_biome',
        name: 'Sagebrush biome extent',
        visible: false,
        url: 'assets/data/sagebrushBoundary.zip',
        style: {
          fillColor: null,
          fillOpacity: 0,
          strokeWeight: 2,
          strokeColor: 'blue',
          strokeOpacity: 0.6
        }}),

      ]
  constructor(private router: Router) {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;


  }

  ngOnInit() {

  }

}

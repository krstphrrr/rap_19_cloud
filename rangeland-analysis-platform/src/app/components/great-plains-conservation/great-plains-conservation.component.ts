import { Component } from '@angular/core';
import {MapStateService, Router, DataLayer, LegendOptions} from 'app/components';
import {MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Overlay } from 'app/services/overlays.service';
import { RoutingService } from 'app/services/routing.service';
import { Helpers } from 'app/classes/helpers';
import * as shp from 'shpjs';

@Component({
  selector: 'app-great-plains-conservation',
  templateUrl: './great-plains-conservation.component.html',
  styleUrls: ['./great-plains-conservation.component.css']
})

export class GreatPlainsConservationComponent {

    router: Router;
    year: number;

  overlays = [new Overlay({
      id: 'cat_tc',
      opacity: 0.6,
      name: 'Categorical tree cover',
      selected_type: {
        name: 'Categorical tree cover',
        id: 'cat_tc',
        tileurl: 'https://storage.googleapis.com/rap-tiles-great-plains-categorical-tree/{year}/{z}/{x}/{y}.png',
        legend: new LegendOptions('', null,null,null,
        [{label: '0-4%', color: '#A6D4B2'},
        {label: '>=5%', color: '#AB0B0B'},
        ])
      },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng( 25.827951645584324 ,  -113.44129660078463 ),
        new google.maps.LatLng( 49.011346352011465 ,  -93.4975613455713 )),
      visible: false,
      help: `Categorical tree cover across the Great Plains. Categorization performed with the rangeland cover product. 480m resolution.`,
      years: Helpers.range(1984, 2021).reverse(),
    }),
    new Overlay({
        id: 'woody',
        opacity: 0.6,
        name: 'Woody transitions',
        selected_type: {
          id: 'woody_trans',
          name: 'Woody transitions',
          tileurl: 'https://storage.googleapis.com/rap-tiles-great-plains-transitions/{year}/{z}/{x}/{y}.png',
          legend: new LegendOptions('', 'low', 'high severity',   ['#A6D4B2', '#F0E442', '#E69F00', '#AB0B0B'])
        },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng( 25.827951645584353 ,  -113.44129660078461 ),
          new google.maps.LatLng( 49.009668052977716 ,  -93.4975613455713 )),
        visible: false,
        help: `Severity of woody transition between perennial- and tree-dominated states.
               240m resolution (broader zoom levels) and 30m resolution (finer zoom levels).`,
        years: [1990, 2000, 2010].concat(Helpers.range(2015, 2021)).reverse()
        }),
       new Overlay({
        id: 'cult_risk',
        opacity: 0.6,
        name: 'Cultivation risk',
        selected_type: {
          id: 'cult_risk',
          name: 'Cultivation risk',
          tileurl: 'https://storage.googleapis.com/rap-tiles-great-plains-cultivation-risk/cultivation-risk/{z}/{x}/{y}.png',
          legend: new LegendOptions('', null,null,null,
            [{label: 'LOW', color: '#4575b4'},
            {label: '', color: '#91bfdb'},
            {label: '', color: '#e0f3f8'},
            {label: 'MED', color: '#ffffbf'},
            {label: '', color: '#fee090'},
            {label: '', color: '#fc8d59'},
            {label: 'HIGH', color: '#d73027'},
          ])
        },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng( 25.00593424584143 ,  -115.61111080156904 ),
          new google.maps.LatLng( 55.17500631806101 ,  -88.83215859863705 )),
        visible: false,
        help: `Probabilistic ecoregion-wide model that used soil, topographic, and climatic variables to simulate future conversion.`
      }),
        new DataLayer({
          id: 'gp_biome_ext',
          name: 'Great Plains biome extent',
          visible: false,
          url: 'assets/data/greatPlainsBoundary.zip',
          style: {
            fillColor: null,
            fillOpacity: 0,
            strokeWeight: 2,
            strokeColor: 'red',
            strokeOpacity: 0.6
          }
        })
        ];




    constructor(
      router: Router,
      public mapState: MapStateService,
      public http: HttpClient,
      private routing: RoutingService,
      public snackBar: MatSnackBar
    ) {
      const queryParams = router.parseUrl(router.url).queryParams;
    }


    setYear(year: number) {

    }
  }

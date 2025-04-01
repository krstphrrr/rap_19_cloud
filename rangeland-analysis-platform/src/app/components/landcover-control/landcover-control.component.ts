import { Component } from '@angular/core';
import {
  rollUpDown, OnInit, MapStateService, AnalysisStateService, Router
} from 'app/components';
// import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Overlay } from '../../services/overlays.service';
import { HttpClient } from '@angular/common/http';

import { GeojsonService } from 'app/services/geojson.service';
import { AnalysisService } from 'app/services/analysis.service';
import { RoutingService } from 'app/services/routing.service';

import * as shp from 'shpjs';
import * as geobuf from 'geobuf';
import Pbf from 'pbf';
import { Helpers } from 'app/classes/helpers';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { spinInOut } from '../../constants/animations';
import { LegendOptions } from 'app/services/overlays.service';



@Component({
    selector: 'app-landcover-control',
    templateUrl: './landcover-control.component.html',
    styleUrls: ['./landcover-control.component.css'],
    animations: [rollUpDown, spinInOut],
    standalone: false
})
export class LandcoverControlComponent implements OnInit {
  // usda google tile layers (biomass, cover)
  usda_rapbiomass: string = 'https://storage.googleapis.com/usda-rap-tiles-biomass-v3';
  usda_rapcover: string = 'https://storage.googleapis.com/usda-rap-tiles-cover-v3';
  
  year: number; // default year
  years = [];
  opacity: number;
  overlay: Overlay;
  file_input: any;
  shapefile: File;

  mask_toggle = true;
  fire_toggle = false;
  fire_id: string;
  fire_years = Helpers.range(1984, 2018).reverse();

  analysis_running = false;
  analysis_error_message = '';
  featureLayers = {};

  overlays = [new Overlay({
    id: 'landcover',
    name: 'Cover',
    opacity: 1.0,
    visible: true,
    help: 'Percent cover of annual forbs and grasses, perennial forbs and grasses, shrubs, trees, and bare ground. 30m resolution.',
    overlay_types: [
      {
        name: 'Perennial forb & grass',
        id: 'pfg',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-cover-v3/{mask}/pfg/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapcover}/{mask}/pfg/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','100%',
          ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
          null)
      },
      {
        name: 'Annual forb & grass',
        id: 'afg',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-cover-v3/{mask}/afg/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapcover}/{mask}/afg/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','100%',
          ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
          null)
      },
      {
        name: 'Shrub',
        id: 'shr',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-cover-v3/{mask}/shr/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapcover}/{mask}/shr/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','100%',
          ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
          null)
      },
      {
        name: 'Tree',
        id: 'tre',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-cover-v3/{mask}/tre/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapcover}/{mask}/tre/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','100%',
          ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
          null)
      },
      {
        name: 'Bare ground',
        id: 'bgr',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-cover-v3/{mask}/bgr/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapcover}/{mask}/bgr/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','100%',
          ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
          null)
      },
    ],
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng( 24.51406344243852 ,  -124.76975514486658 ),
      new google.maps.LatLng( 49.3935983693073 ,  -66.93652153957034 )),
    years: Helpers.range(1986, 2025).reverse()
  }), new Overlay({
    id: 'biomass',
    name: 'Biomass',
    opacity: 1.0,
    help: `Annual accumulation of new aboveground biomass for annual forbs and grasses,
           perennial forbs and grasses, and herbaceous (annual and perennial
           combined). 30m resolution.`,
    overlay_types: [
      {
        name: 'Herbaceous',
        id: 'herbaceous',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-biomass-v3/{mask}/herbaceous/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapbiomass}/{mask}/herbaceous/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
            '', '0','>4000 lbs/acre',
            ["#FFE599","#F6DC86","#EDD375","#E3C961","#D9BF4F",
             "#CBB33A","#B9A525","#A89A14","#969206","#878E03",
             "#7A8B06","#6C840E","#617E14","#56771A","#4C7020",
             "#436A25","#3A652A","#325F2F","#2B5A34","#235538",
             "#1C513C","#154C41","#0F4845","#084449","#00404D"],
            null)
      },
      {
        name: 'Annual forb & grass',
        id: 'afg',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-biomass-v3/{mask}/afg/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapbiomass}/{mask}/afg/{year}/{z}/{x}/{y}.png`,
        legend: new LegendOptions(
          '', '0','>2000 lbs/acre',
          ["#FFFFCC","#FBEC9A","#F4CC68","#ECA855","#E48751","#D2624D",
          "#A54742","#73382F","#422818","#1A1A01"],
          null)
      },
      {
        name: 'Perennial forb & grass',
        id: 'pfg',
        // tileurl: 'https://storage.googleapis.com/rap-tiles-biomass-v3/{mask}/pfg/{year}/{z}/{x}/{y}.png',
        tileurl: `${this.usda_rapbiomass}/{mask}/pfg/{year}/{z}/{x}/{y}.png`,

        legend: new LegendOptions(
          '', '0','>4000 lbs/acre',
          ["#FFE599","#F6DC86","#EDD375","#E3C961","#D9BF4F",
           "#CBB33A","#B9A525","#A89A14","#969206","#878E03",
           "#7A8B06","#6C840E","#617E14","#56771A","#4C7020",
           "#436A25","#3A652A","#325F2F","#2B5A34","#235538",
           "#1C513C","#154C41","#0F4845","#084449","#00404D"],
          null)
      }
    ],
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng( 24.51406344243852 ,  -124.76975514486658 ),
      new google.maps.LatLng( 49.3935983693073 ,  -66.93652153957034 )),
    visible: false,
    years: Helpers.range(1986, 2025).reverse()
  })]

  constructor(
    private router: Router,
    public mapState: MapStateService,
    public http: HttpClient,
    public analysisState: AnalysisStateService,
    public analysis: AnalysisService,
    private routing: RoutingService,
    public snackBar: MatSnackBar
  ) {

    // initialize range of years supported
    const queryParams = this.router.parseUrl(this.router.url).queryParams;

    this.mask_toggle = queryParams['mask'] === undefined ? true : queryParams['mask'] === 'apply';
    this.fire_toggle = queryParams['fire'] !== undefined;
    this.fire_id = queryParams['fid'];
    this.analysis_running = false;
    this.analysis_error_message = undefined;
    this.year = parseInt(queryParams['year'], 10) || 2017;
  }



  updateOverlays() {
    this.routing.updateUrlParams({
      fire: (this.fire_toggle) ? 'show' : null,
      year: this.year,
      mask: (this.mask_toggle) ? 'apply' : 'hide'
    });
    this.overlays.forEach(o => {
      if (o instanceof Overlay) {
        o.mask = this.mask_toggle
        if (o.visible) {
          this.mapState.removeOverlay(o);
          this.mapState.setOverlay(o);
        }
      }
    })


    this.updateFireYear();
  }

  updateFireYear() {
    const self = this;
    this.mapState.removeDataLayer('fire');
    if (this.fire_toggle && this.year && this.year <= 2019) {
      this.routing.updateUrlParams({fire: 'show', year: this.year });

      this.http.get(
        `https://storage.googleapis.com/rap-mtbs/years/${this.year}.pbf`,
        { responseType: 'arraybuffer' }).pipe
        (map(r => geobuf.decode(new Pbf(r))))
        .subscribe((g) => {
          const data = new google.maps.Data();
          data.setStyle({
            fillColor: null,
            fillOpacity: 0,
            strokeWeight: 2,
            strokeColor: 'red'
          });

          data.addListener('click',
             (event: google.maps.Data.MouseEvent) => {
              console.log(event);
              event.feature.toGeoJson(
                (f: GeoJSON.Feature) => {
                  const button = document.createElement('button'),
                    container = document.createElement('div'),
                    text = document.createElement('div'),
                    p: any = f.properties,
                    info = new google.maps.InfoWindow();
                  console.log(f);
                  text.innerHTML = `
                    <div><strong>Fire name:</strong> ${p.Fire_Name}</div>
                    <div><strong>Start date:</strong> ${p.StartMonth}/${p.StartDay}/${p.Year}</div>
                    <div><strong>Size:</strong> ${p.Acres} acres<div>
                  `;
                  button.setAttribute('mat-raised-button', 'true');
                  button.innerHTML = 'Calculate time series';
                  f['properties'] = {
                    'mask': self.mask_toggle
                  }

                  button.onclick = (e) => {
                      self.analysis.geojson = f;
                      self.analysis.subtitle = f.properties['Fire_Name'];
                      console.log(p);
                      self.routing.updateUrlParams({fid: p.Fire_ID});
                      self.analysis.analysis_running = true;
                      self.analysis.calculateAnalysis(self.mask_toggle)
                      //  self.overlays.find(o=> o.id === 'biomass').year || 2019)
                  };

                  container.appendChild(text).appendChild(button);
                  info.setContent(container);
                  info.setPosition(event.latLng);
                  self.mapState.openWindow(info);
                });
            });

            data.set('id', 'fire');
          data.addGeoJson(g)
          this.mapState.setDataLayer(data);
          if (this.fire_id) {
            data.forEach((f) => {
              if (f.getProperty('Fire_ID') === this.fire_id) {
                f.toGeoJson((geojson: GeoJSON.FeatureCollection) => {
                              self.analysis.geojson = geojson;
                              self.analysis.analysis_running = true;
                              self.analysis.calculateAnalysis(self.mask_toggle)
                            });
              }
            })
          }
        });



    } else {
      this.routing.updateUrlParams({fire: undefined, fid: undefined});
    }
  }

  clearMap() {
    this.analysis.resetAnalysis(true, true);
    this.mapState.removeDataLayer('upload');
    this.routing.updateUrlParams({fid: null});
  }

  uploadShapefile() {
    this.file_input.click();
  }

  processShapefile(event: any) {
    if (event.target.files[0]) {
      const reader = new FileReader();
      const self = this;
      this.shapefile = event.target.files[0];
      this.file_input.value = '';
      reader.onload = async function (e: any) {

        const geojson = await shp.parseZip(e.target.result),
              data = new google.maps.Data();
        let geo: GeojsonService;
        console.log(geojson)
        if (geojson['features'].length > 1000) {
          geojson['features'] = geojson['features'].slice(0, 1000);
          self.snackBar.open('Shapefile uploads are limited to 1000 features.',
                             'Dismiss',
                             {duration: 3000});

        }
        geo = new GeojsonService(geojson);
        data.setStyle({
                        fillColor: null,
                        fillOpacity: 0,
                        strokeWeight: 2,
                        strokeColor: 'orange'
                      });
        data.addGeoJson(geojson);
        data.addListener('click', self.clickHandler);
        self.mapState.removeDataLayer('analysis');
        data.set('id', 'upload');
        /*** start click handler  ***/

        data.addListener('click', self.clickHandler.bind(self));

        /*** end click  handler ***/
        self.mapState.setBounds(geo.getBounds());
        self.mapState.setDataLayer(data);

      };
      reader.onerror = function (e) {};

      reader.readAsArrayBuffer(this.shapefile);
      this.snackBar.open(`Click a feature to run cover and
                          biomass trend analyses.`,
                          null,
                          {duration: 10000}
                         );
    }

  }

  clickHandler(event: google.maps.Data.MouseEvent) {
    if (!this.mapState) {return}
    event.feature.toGeoJson(
      (f: GeoJSON.Feature) => {
        const button = document.createElement('button'),
          container = document.createElement('div'),
          text = document.createElement('div'),
          p: any = f.properties,
          info = new google.maps.InfoWindow();
        console.log(f);
        Object.keys(p).forEach((k, i) => {
        text.innerHTML += `
          <div><strong>${k}:</strong> ${p[k]}</div>
        `;
        });
        button.setAttribute('mat-raised-button', 'true');
        button.innerHTML = 'Calculate time series';
        f['properties'] = {
          'mask': this.mask_toggle
        }

        button.onclick = (e) => {
            this.analysis.geojson = f;
            this.analysis.subtitle = f.properties['Fire_Name'];
            this.routing.updateUrlParams({fid: p.Fire_ID});
            this.analysis.analysis_running = true;
            this.analysis.calculateAnalysis(this.mask_toggle);
        };

        container.appendChild(text).appendChild(button);
        info.setContent(container);
        info.setPosition(event.latLng);
        this.mapState.openWindow(info);
      });
  }

  drawFeatures() {
    this.analysis.resetAnalysis(true);
    this.mapState.setDrawingMode([
      'Polygon', 'Point', 'LineString']);
    this.mapState.setDrawHandler((d: google.maps.Data) => {
      d.toGeoJson((g: GeoJSON.FeatureCollection) => {
        this.analysis.geojson = g.features[0];
        this.mapState.setDrawingMode(null);
        this.analysis.calculateAnalysis(this.mask_toggle);
      });
    });
  }

  ngOnInit() {
    this.updateOverlays();
    this.file_input = document.createElement('input');
    this.file_input.type = 'file';
    this.file_input.accept = '.zip, application/zip, application/octet-stream';
    this.file_input.addEventListener(
      'change', this.processShapefile.bind(this));
  }
}

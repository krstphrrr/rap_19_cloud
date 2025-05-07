
import {throwError as observableThrowError,  BehaviorSubject ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapStateService } from 'app/services/map-state.service';


const errMsg = `There was an error in the analysis,
please try again. If the problem persists, please see
<a href="https://rangelands.app/support/shapefile/">shapefile help.</a>`;
//const API_URL = `http://localhost:8080/{method}`;
// const API_URL = 'https://rangeland-analysis-platform.uc.r.appspot.com/{method}';
const RANGELAND_API_KEY = 'AIzaSyC3e1OYR-d1u3wvxcK8EvrcFCQMvGW2Tzk';
// usda cloudfun (meteo, cover, prod16d, prodSURGO, prod)
const usda_meteo: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/coverMeteorologyV3';
const usda_cover: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/coverV3';
const usda_prod16d: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/production16dayV3';
const usda_prodsurgo: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/productionGSSURGO';
const usda_prod: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/productionV3';

const usda_cover_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/cover10m';
const usda_meteo_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/coverMeteorology10m';
const usda_gapcover_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/gapCover10m';
const usda_invasive_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/invasiveAnnualGrassCover10m'; //done, tho analysis needs to fit more neatly in window
const usda_pjcover_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/pjCover10m';
const usda_sagebrush_10m: string = 'https://us-central1-rap-data-365417.cloudfunctions.net/sagebrushCover10m';



const TREND_CONFIG = {
  annual_cover: {
    // endpoint: 'https://us-central1-rap-data-365417.cloudfunctions.net/coverMeteorologyV3?key=' + RANGELAND_API_KEY,
    endpoint:`${usda_meteo}`,
    propertyResult: 'cover',
    title: '',
    y_axis: 'Cover (%)',
    series: [
      // eslint-disable-next-line max-len
      { name: 'Annual forb & grass cover', id: 'afg', color: '#67000d', type: 'line',   format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Perennial forb & grass cover', id: 'pfg', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Shrub cover', id: 'shr', type: 'line', color: '#08306b',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Tree cover', id: 'tre', type: 'line', color: '#d36029',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Bare ground cover', id: 'bgr', type: 'line', color: '#fe9929',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Mean annual temp', id: 'annualtemp', color: '#ED44A1', opacity: 0, type: 'bar',  visibleInLegend: false,  format: { prefix: '',pattern: '#0', suffix: '°F' }, visible: false },
      // eslint-disable-next-line max-len
      { name: 'Annual precipitation', id: 'annualprecip', color: '#88A0EE', type: 'bar',   visibleInLegend: true, format: { prefix: '', pattern: '#0', suffix: ' inches' }, visible: true }
    ]
  },
  annual_biomass: {
      // endpoint: 'https://rap-api-8ubptl6m.uc.gateway.dev/v3/production?key=' + RANGELAND_API_KEY,
      endpoint: `${usda_prod}`,
      propertyResult: 'production',
      title: '',
      y_axis: 'Biomass (lbs/acre)',
      series: [
        // eslint-disable-next-line max-len
        { name: 'Annual forb & grass biomass', id: 'afg', color: '#67000d', type: 'line',  format: {  prefix: '', pattern: '#0', suffix: '' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Perennial forb & grass biomass', id: 'pfg', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Herbaceous biomass', id: 'her', color: '#08306b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '' }, visible: true }

      ]
  },
  biweekly_biomass: {
    // endpoint: 'https://rap-api-8ubptl6m.uc.gateway.dev/v3/production16day?key=' + RANGELAND_API_KEY,
    endpoint: `${usda_prod16d}`,
    propertyResult: 'production16day',
    title: '',
    y_axis: 'Biomass (lbs/acre)',
    y_range: [0, 2500],
    x_axis_tickformat: '%Y-%m-%d',
    group_by: 'doy',
    waiting_msg: '16-day biomass charts may take up to a minute to generate',
    series: [
      // eslint-disable-next-line max-len
      { name: 'Annual forb & grass biomass', id: 'afg', color: '#67000d', type: 'line',  format: {  prefix: '', pattern: '#0', suffix: '' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Annual forb & grass biomass', id: 'afg', color: '#67000d', type: 'line',  format: {  prefix: '', pattern: '#0', suffix: '' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Perennial forb & grass biomass', id: 'pfg', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '' }, visible: true },
      // eslint-disable-next-line max-len
      { name: 'Herbaceous biomass', id: 'her', color: '#08306b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '' }, visible: true }

    ]
  },
  meteo_10: {
    // endpoint: 'https://us-central1-rap-data-365417.cloudfunctions.net/coverMeteorologyV3?key=' + RANGELAND_API_KEY,
    endpoint:`${usda_meteo_10m}`,
    propertyResult: 'cover',
    title: '',
    y_axis: 'Cover (%)',
    series: [
        // eslint-disable-next-line max-len
        { name: 'Annual forb & grass cover', id: 'afg', color: '#67000d', type: 'line',   format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Perennial forb & grass cover', id: 'pfg', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Shrub cover', id: 'shr', type: 'line', color: '#08306b',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Tree cover', id: 'tre', type: 'line', color: '#d36029',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Bare ground cover', id: 'bgr', type: 'line', color: '#fe9929',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
        // eslint-disable-next-line max-len
        { name: 'Mean annual temp', id: 'annualtemp', color: '#ED44A1', opacity: 0, type: 'bar',  visibleInLegend: false,  format: { prefix: '',pattern: '#0', suffix: '°F' }, visible: false },
        // eslint-disable-next-line max-len
        { name: 'Annual precipitation', id: 'annualprecip', color: '#88A0EE', type: 'bar',   visibleInLegend: true, format: { prefix: '', pattern: '#0', suffix: ' inches' }, visible: true }
      ]
  },
  // cover_10: {
  //   endpoint:`${usda_cover_10m}`,
  //   propertyResult: 'cover10',
  //   title: '',
  //   y_axis: 'Cover (%)',
  //   series: [
  //     // eslint-disable-next-line max-len
  //     { name: 'Annual forb & grass cover', id: 'afg', color: '#67000d', type: 'line',   format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'Perennial forb & grass cover', id: 'pfg', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'Shrub cover', id: 'shr', type: 'line', color: '#08306b',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'Tree cover', id: 'tre', type: 'line', color: '#d36029',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'Bare ground cover', id: 'bgr', type: 'line', color: '#fe9929',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //   ]
  // }, 
  // gap_cover_10: {
  //   endpoint:`${usda_gapcover_10m}`,
  //   propertyResult: 'cover',
  //   title: '',
  //   y_axis: 'Cover (%)',
  //   series: [
  //     // eslint-disable-next-line max-len
  //     { name: 'gap 25-100', id: 'G25_50', color: '#67000d', type: 'line',   format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'gap 51-100', id: 'G51_100', color: '#00441b', type: 'line',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'gap 101-200', id: 'G101_200', type: 'line', color: '#08306b',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //     // eslint-disable-next-line max-len
  //     { name: 'gap 200+', id: 'G200_plus', type: 'line', color: '#d36029',   format: { prefix: '', pattern: '#0', suffix: '%' }, visible: true },
  //   ]
  // },
  invasive_cover_10: {
    endpoint:`${usda_invasive_10m}`,
    propertyResult: 'cover',
    title: '',
    y_axis: 'Cover (%)',
    series: [
      // eslint-disable-next-line max-len
      { name: 'Invasive annual grass cover', id: 'iag', color: '#67000d', type: 'line', visibleInLegend: true,  format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
    ]
  },
  pj_cover_10: {
    endpoint:`${usda_pjcover_10m}`,
    propertyResult: 'cover',
    title: '',
    y_axis: 'Cover (%)',
    series: [
      // eslint-disable-next-line max-len
      { name: 'PJ cover', id: 'pj', color: '#08306b', type: 'line', visibleInLegend: true,  format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
    ]
  },
  sagebrush_cover_10: {
    endpoint:`${usda_sagebrush_10m}`,
    propertyResult: 'cover',
    title: '',
    y_axis: 'Cover (%)',
    series: [
      // eslint-disable-next-line max-len
      { name: 'Sagebrush cover', id: 'artr', color: '#08306b', type: 'line', visibleInLegend: true,  format: {  prefix: '', pattern: '#0', suffix: '%' }, visible: true },
    ]
  },
}

@Injectable()
export class AnalysisService {
  public analysis_running: boolean;
  public analysis_complete: boolean;
  public analysis_error_message: String;
  public subtitle: String;
  public geojson: GeoJSON.GeoJsonObject | GeoJSON.FeatureCollection | GeoJSON.Feature | any;
  public results = Object.keys(TREND_CONFIG).reduce((r, k) => Object.assign(r, {[k]: new BehaviorSubject<[][]>([])}), {});
  public polygonID = new BehaviorSubject<string>(null);
  public data: google.maps.Data;
  public config = TREND_CONFIG;

  constructor(
    private http: HttpClient,
    private mapState: MapStateService
  ) {
    this.resetDataLayer();
  }

  resetDataLayer() {
    this.data = new google.maps.Data();
    this.data.set('id', 'analysis');
    this.data.setStyle(this.polygonStyleFunction);
  }

  clear() {
    this.mapState.removeDataLayer('analysis');
    this.mapState.setDrawingMode(null);
    Object.keys(TREND_CONFIG).forEach(trend => this.results[trend].next(null));
  }

  setPolygon(polygon: GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon> | GeoJSON.GeoJsonObject, id?: number) {
   if (polygon) {
      this.geojson = polygon;
      this.analysis_running = false;
      this.analysis_complete = true;
      this.data.forEach(f => this.data.remove(f))
      this.data.addGeoJson(this.geojson);

      this.data.revertStyle();
      this.data.setStyle({
        fillColor: null,
        fillOpacity: 0,
        strokeWeight: 2,
        strokeColor: 'black'
      });
      this.mapState.removeDataLayer('analysis');
      this.mapState.setDataLayer(this.data);
    }
  }

  polygonStyleFunction(feature: google.maps.Data.Feature) {
    const vals = []
    return ({
      fillColor: 'grey',
      strokeColor: 'black',
      fillOpacity:  0.8,
      strokeWeight: 0, // (feature.getProperty('selected')) ? 4 : 0,
      strokeOpacity: 0.8 // (feature.getProperty('selected')) ? 1 : 0.8
    });
  }

  calculateAnalysis(mask: boolean) {
    if (this.geojson) {
      this.clear();
      this.analysis_running = true;
      this.analysis_error_message = undefined;
      // this.average_geojson = undefined;
      const options = {
        headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'}),
      };
      console.log("GEOJSON PROPERTIES: ", this.geojson )
      console.log("MASK: ", mask)

      this.geojson['properties'] = {
        mask: mask
      }

      const payload = this.geojson;
      this.setPolygon(this.geojson);

      Object.keys(TREND_CONFIG)
              // .forEach(trend_type => this.http.post<{result: [][]}>(
              //   TREND_CONFIG[trend_type].endpoint, JSON.stringify(payload), options)
              //     .subscribe(
              //       r => {
              //         console.log('TREND_TYPE:', trend_type, 'RESPONSE:', r);
              //         // if (trend_type == 'annual_cover') {
              //         //   r['properties'] = {};
              //         //   r['properties']['cover'] = r.result;
              //         // } 
              //         this.results[trend_type].next(r['properties'][TREND_CONFIG[trend_type].propertyResult])
              //       })
              //     );
              .forEach(trend_type => this.http.post<{result: [][]}>(
                TREND_CONFIG[trend_type].endpoint, JSON.stringify(payload), options)
                  .subscribe(
                    r => {
                      console.log('TREND_TYPE:', trend_type, 'RAW RESPONSE:', r);
                      if (r && r['properties'] && TREND_CONFIG[trend_type].propertyResult in r['properties']) {
                        this.results[trend_type].next(r['properties'][TREND_CONFIG[trend_type].propertyResult]);
                      } else {
                        this.results[trend_type].next(null);
                        console.error(`No properties found for trend_type: ${trend_type}`, r);
                      }
                    },
                    error => {
                      this.results[trend_type].next(null);
                      this.analysis_error_message = 'Analysis failed: ' + (error.message || error.statusText);
                      console.error('HTTP ERROR for trend_type:', trend_type, error);
                    }
                  )
                )

    }
  }

  resetAnalysis(clearGeoJSON: boolean, stopDrawing?: boolean) {
    this.analysis_running = false;
    this.analysis_error_message = undefined;
    this.geojson = null;
    this.mapState.removeDataLayer('analysis');
    if (clearGeoJSON) {
      this.geojson = undefined;
      this.polygonID.next(null);
    }

    Object.keys(TREND_CONFIG).forEach(trend => this.results[trend].next(null));
    this.mapState.setDrawing(null);
  }

}

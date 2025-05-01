import { Injectable } from '@angular/core';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { Overlay } from './overlays.service';
import { GoogleStyleConverterService } from 'app/services/google-style-converter.service';
import { SimpleBaseMap } from 'app/components/map/basemaps.service';
import * as shp from 'shpjs';
import { DataLayer } from 'app/services/data-layers.service';
import { stringify } from 'querystring';

const STATIC_MAP_URL = `https://maps.googleapis.com/maps/api/staticmap`;
const gapi = 'AIzaSyDllQcO2NYJk0KqA1NH80B_sINnAvUNGGA'

@Injectable()
export class MapStateService {

  // TODO switch to BehaviorSubject
  // Observable sources
  private basemapSource = new BehaviorSubject<string|google.maps.MapTypeId>('roadmap');
  basemap = this.basemapSource.asObservable();


  private overlaysSource = new BehaviorSubject<Overlay[]>([]);
  overlays = this.overlaysSource.asObservable();

  private dataLayersSource = new Subject<google.maps.Data[]>();
  public dataLayerArr: google.maps.Data[] = [];
  dataLayers = this.dataLayersSource.asObservable();

  private dataLayerStylesSource = new Subject<{
    id: string, style: google.maps.Data.StylingFunction
  }>();
  public dataLayerStyles = this.dataLayerStylesSource.asObservable();

  private geojsonSource = new BehaviorSubject<GeoJSON.GeoJsonObject>(null);
  geojson = this.geojsonSource.asObservable();

  private clickSource = new Subject<Function>();
  click = this.clickSource.asObservable();

  private drawSource = new Subject<Function>();
  draw = this.drawSource.asObservable();

  private drawingModeSource = new Subject<google.maps.drawing.OverlayType[]>();
  drawingMode = this.drawingModeSource.asObservable();

  private mousemoveSource = new Subject<Function>();
  mousemove = this.mousemoveSource.asObservable();

  private zoomSource = new BehaviorSubject<number>(6);
  zoom = this.zoomSource.asObservable();

  private boundsSource = new Subject<google.maps.LatLngBounds>();
  bounds = this.boundsSource.asObservable();

  private centerSource = new BehaviorSubject<google.maps.LatLng>(null);
  center = this.centerSource.asObservable();

  private infoWindowSource = new Subject<google.maps.InfoWindow>();
  infoWindow = this.infoWindowSource.asObservable()

  constructor(private styleConverter: GoogleStyleConverterService) {
    // populate overlays with available layers.
    // ensures only one overlay can be active at a time. Tracked by various
    // toggle switches.
    /*this.overlay.subscribe(
      o => Object.keys(this.overlays).map(
        k => this.overlays[k] = (k === (o || { name: '' }).name)));
    */
  }

  public staticMapUrl(width?: number, height?: number, polygon?: google.maps.Data) {
    const center = this.centerSource.getValue(),
      lat = center.lat(), lng = center.lng(),
      zoom = this.zoomSource.getValue(),
      maptype = this.basemapSource.getValue(),
      mapstyle = this.styleConverter.get_static_style(new SimpleBaseMap().style);

    const url = `https://maps.googleapis.com/maps/api/staticmap?key=${gapi}&` +
      `center=${lat},${lng}&zoom=${zoom}&scale=2&` +
      `size=${width / 2}x${height / 2}&maptype=${maptype}&${mapstyle}` ;
      return url;
  }


  setClickHandler(handler: Function) { this.clickSource.next(handler); }
  
  setDataLayer(layer: google.maps.Data) {
    if (!this.dataLayerArr.find(l => (l.get('id') === layer.get('id')) && l.get('id') && layer.get('id'))) {
      this.dataLayerArr.push(layer);
    }
    this.dataLayersSource.next(this.dataLayerArr);
  }
  // removeDataLayer(id: string) {
  //   this.dataLayerArr.filter(l => l.get('id') === id).map(l => l.setMap(null));
  //   this.dataLayerArr = this.dataLayerArr.filter(l => l.get('id') !==id);
  //   this.dataLayersSource.next(this.dataLayerArr);
  // }

  removeDataLayer(id?: string) {
    if (!id) {
      while (this.dataLayerArr.length > 0) {
        const layer = this.dataLayerArr.pop();
        if (layer) {
          layer.setMap(null);
        }
      }
    } else {
      this.dataLayerArr = this.dataLayerArr.filter(layer => {
        if (layer && layer['id'] === id) {
          layer.setMap(null);
          return false;
        }
        return true;
      });
    }
  }
  
  clearMap() {
    this.dataLayerArr.forEach(l => this.removeDataLayer(l.get('id')) )
    this.overlaysSource.next([])
  }

  setDataLayerStyle(id: string, style: google.maps.Data.StylingFunction) {
    this.dataLayerStylesSource.next({ id: id, style: style })
  }
  setOpacity(id: string, opacity: number) {

  }

  setOverlay(overlay: Overlay | DataLayer, idx?: number) {
    if (overlay && overlay instanceof Overlay) {
      const overlays = this.overlaysSource.getValue();
      this.removeOverlay(overlay);
      overlays.splice(idx ? idx : overlays.length, 0, overlay);
      this.overlaysSource.next(overlays);
    }
    if (overlay && overlay instanceof DataLayer) {
      this.removeDataLayer(overlay.name)
      fetch(overlay.url)
        .then(r => r.arrayBuffer())
        .then(a => shp.parseZip(a))
        .then(geojson => {
            const data = new google.maps.Data();
        data.addGeoJson(geojson);
        data.set('id', overlay.name);
        data.setStyle(overlay.style);
        this.setDataLayer(data)
      })
    }
  }
  removeOverlay(overlay: Overlay) {
    if(overlay) {
      const overlays = this.overlaysSource.getValue();
      this.overlaysSource.next(overlays.filter(o => o.id !== overlay.id));
      this.removeDataLayer(overlay.id);
    }
  }
  refresh() {
    const overlays = this.overlaysSource.getValue();
    this.overlaysSource.next([]);
    this.overlaysSource.next(overlays);
  }
  setDrawing(geojson: GeoJSON.GeoJsonObject) { this.geojsonSource.next(geojson); }
  setBasemap(basemap: string | google.maps.MapTypeId) { this.basemapSource.next(basemap); }
  setDrawHandler(handler: Function) { this.drawSource.next(handler); }
  setMouseMoveHandler(handler: Function) { this.mousemoveSource.next(handler); }
  setZoom(zoom: number) { this.zoomSource.next(zoom); }
  setBounds(bounds: google.maps.LatLngBounds) { this.boundsSource.next(bounds); }
  setCenter(center: google.maps.LatLng) { this.centerSource.next(center); }
  setDrawingMode(mode: google.maps.drawing.OverlayType[]) { this.drawingModeSource.next(mode); }
  openWindow(window: google.maps.InfoWindow) {
    this.infoWindowSource.next(window)
  }
}

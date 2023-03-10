
import { Component, Input,  OnInit } from '@angular/core';
import { SimpleBaseMap } from './basemaps.service';
import { Overlay } from '../../services/overlays.service';
import { MapStateService } from '../../services/map-state.service';



import { RoutingService } from '../../services/routing.service';
const globalMaxZoom = 20;
const globalMinZoom = 4;

export interface OverlayMapTypeOptions {
  opacity?: number;
  minZoom?: number;
  maxZoom?: number;
  maxNativeZoom: number;
  getTileUrl: (tileCoord: google.maps.Point, zoom: number) => string;
  tileSize: google.maps.Size;
}

export class OverlayMapType implements google.maps.MapType {
  public opacity: number;
  public minZoom: number;
  public maxZoom: number
  public maxNativeZoom: number;
  public tileSize: google.maps.Size;
  private tiles: HTMLElement[] = [];
  private getTileUrl: (tileCoord: google.maps.Point, zoom: number) => string;
  public releaseTile = (tile: HTMLElement) => {
    this.tiles = this.tiles.filter((t) => t !== tile);
  };
  public setOpacity = (opacity: number) => {
    this.tiles.map(t => t.style.opacity = opacity.toString())
  };

  public getTile = (tileCoord: google.maps.Point, zoom: number, ownerDocument: Document): Element => {
    let src: string;
    const tile = document.createElement('div'),
      img = document.createElement('img');
    tile.style.overflow = 'hidden';
    tile.style.position = 'absolute';
    tile.style.width = this.tileSize.width.toString() + 'px';
    tile.style.height = this.tileSize.height.toString() + 'px';
    tile.style.opacity = this.opacity.toString();
    img.onerror = (event) => {img.src = 'assets/blank.png'};
    if (zoom > this.maxNativeZoom) {

      const ctx = this.getMaxNativeTileCtx(tileCoord, zoom, this.maxNativeZoom);
      tileCoord = ctx.coords;
      src = this.getTileUrl(tileCoord, this.maxNativeZoom);
      if (src) {
        img.src = src;
        img.style.width = ctx.offset.width;
        img.style.height = ctx.offset.height;
        img.style.position = 'relative';
        img.style.left = ctx.offset.left;
        img.style.top = ctx.offset.top;
      }

    } else {
      src = this.getTileUrl(tileCoord, zoom);
      if (src) {
        img.src = src;
      }
    }
    this.tiles.push(tile);
    tile.appendChild(img);
    return tile;
  };

  private getMaxNativeTileCtx(tileCoord: google.maps.Point, currentZoom: number, maxNativeZoom: number) {
    const tx = tileCoord.x, ty = tileCoord.y,
      wx = tx / Math.pow(2, currentZoom), wy = ty / Math.pow(2, currentZoom),
      wx1 = (tx + 1) / Math.pow(2, currentZoom), wy1 = (ty + 1) / Math.pow(2, currentZoom),
      mx = Math.floor(wx * Math.pow(2, maxNativeZoom)), my = Math.floor(wy * Math.pow(2, maxNativeZoom)),
      wmx = mx / Math.pow(2, maxNativeZoom), wmy = my / Math.pow(2, maxNativeZoom),
      wmx1 = (mx + 1) / Math.pow(2, maxNativeZoom), wmy1 = (my + 1) / Math.pow(2, maxNativeZoom),
      mp = Math.pow(2, (currentZoom - maxNativeZoom)),
      left = -256 * mp * (wx - wmx) / (wmx1 - wmx),
      top = -256 * mp * (wy - wmy) / (wmy1 - wmy),
      width = 256 * mp + 'px', height = 256 * mp + 'px';

    return {
      coords: new google.maps.Point(mx, my),
      offset: {
        left: left + 'px',
        top: top + 'px',
        width: width,
        height: height
      }
    }

  }


  constructor(private config: OverlayMapTypeOptions) {
    this.minZoom = config.minZoom || 0;
    this.maxNativeZoom = config.maxNativeZoom || 12;
    this.maxZoom = config.maxZoom || 12;
    this.getTileUrl = config.getTileUrl;
    this.opacity = config.opacity;
    this.tileSize = config.tileSize || new google.maps.Size(256, 256);
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private ready: boolean;
  private map: google.maps.Map;
  private overlay: Overlay;
  private maptype: google.maps.MapTypeId;
  private data: google.maps.Data;
  private dataListeners: google.maps.MapsEventListener[] = [];
  private data_layers: google.maps.Data[] = [];
  private onDrawHandler: Function;
  private activeInfoWindow: google.maps.InfoWindow;

  @Input() lat;
  @Input() lng;
  @Input() zoom;
  @Input() basemap;

  constructor(
    private mapState: MapStateService,
    private routing: RoutingService,
  ) {
    this.ready = false;
    this.zoom = this.zoom || 6;
    this.lng = this.lng || -110.4298;
    this.lat = this.lat || 38.8633;
  }

  setDrawingMode(mode: google.maps.DrawingMode[]) {
    if (this.map) {
      if (!mode) {
        this.data.setControls(null);
        this.data.setDrawingMode(null);
        this.data.setStyle({
          editable: false,
          draggable: false
        });
      } else {
        this.data.setControls(mode);
        this.data.setDrawingMode(mode[0]);
        this.data.setStyle({
          editable: true,
          draggable: true
        });
        this.data.setMap(this.map);
        this.setDataListeners();
      }
    }
  }


  public clearGeojson() {
    if (this.map && this.data) {
      const map = this.map;
      this.data.forEach(function (feature) {
        map.data.remove(feature);
      });
    }
  }

  /*
   * Clears data layer. All if no id given.
   */
  public clearDataLayer(id?: string) {
    if (!id) {
      while (this.data_layers.length > 0) {
        const layer = this.data_layers.pop();
        layer.setMap(null);
      }
    } else {
      this.data_layers = this.data_layers.filter(
        function (layer) {
          if (layer['id'] === id) {
            layer.setMap(null);
            return false;
          } else {
            return true;
          }
        }
      );

    }
  }

  public setDataStyle(styler: google.maps.Data.StylingFunction) {
    this.data.setStyle(styler);
  }

  public styleDataLayer(styler: { id: string, style: google.maps.Data.StylingFunction }) {
    this.data_layers.forEach(
      function (layer) {
        if (layer['id'] === styler.id) {
          layer.setStyle(styler.style);
        }
      }
    );
  }

  setDataListeners() {
    const self = this;
    this.dataListeners.forEach((l, i, a) => l.remove());
    this.dataListeners.push(google.maps.event.addListener(
      this.data, 'addfeature', function (event) {

        self.map.data.forEach(
          function (feature: any) {
            feature.setProperty('selected', false);
          }
        );
        (self.onDrawHandler || (() => { }))(this);
      }));
    this.dataListeners.push(google.maps.event.addListener(
      this.data, 'click', function (event) {
        event.feature.toGeoJson(
          function (g) {
            self.map.data.forEach(
              function (feature: any) {
                feature.setProperty('selected', false);
              }
            );
            // TODO: seperate these events better
            event.feature.setProperty('selected', true);
          }
        );
      }));
  }

  removeDataListeners() {
    (this.dataListeners || []).forEach((l) => l.remove());
  }

  updateDataLayer(datalayer: google.maps.Data) {
    this.map.data.setMap(null);
    datalayer.setMap(this.map);
  }



  setOverlay(overlay) {
    const self = this;

    if (this.ready) {
      const overlayMapType = new OverlayMapType({
        maxNativeZoom: overlay.maxnativezoom,
        opacity: (overlay.opacity >= 0) ? overlay.opacity : 0.8,
        minZoom: overlay.minzoom || globalMinZoom,
        maxZoom: overlay.maxzoom || globalMaxZoom,
        tileSize: new google.maps.Size(256, 256),
        getTileUrl: function (coords: google.maps.Point, zoom: number) {
          const proj = self.map.getProjection(),
            z2 = Math.pow(2, zoom), tileXSize = 256 / z2, tileYSize = 256 / z2,
            tileBounds = new google.maps.LatLngBounds(
              proj.fromPointToLatLng(
                new google.maps.Point(coords.x * tileXSize, (coords.y + 1) * tileYSize)),
              proj.fromPointToLatLng(
                new google.maps.Point((coords.x + 1) * tileXSize, coords.y * tileYSize))
            );
          return (!overlay.bounds || (overlay.bounds && overlay.bounds.intersects(tileBounds))) ?
            overlay.selected_type.tileurl
              .replace(/{mask}/g,  overlay.mask ? 'masked' : 'unmasked')
              .replace(/{year}/g, overlay.year ? overlay.year.toString() : '2019')
              .replace(/{z}/g, zoom.toString())
              .replace(/{y}/g, coords.y.toString())
              .replace(/{x}/g, coords.x.toString()) :
            'assets/blank.png';
        },
      });

      this.map.setOptions({ maxZoom: overlay.maxzoom });
      this.map.overlayMapTypes.push(overlayMapType);

    } else if (this.ready) {
      this.map.overlayMapTypes.clear();
    }
  }

  setUserLocation() {
    const self = this;
    if (!!navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition(
          function (position) {
            self.map.panTo(
              new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            );
            self.map.setZoom(10);
          });
    }
  }

  addControl(control: Element, position: google.maps.ControlPosition) {
    this.map.controls[position].push(control);
  }

  applyParams(params) {
    const lat = (params.ll || '').split(',')[0],
      lng = (params.ll || '').split(',')[1],
      zoom = params.z;

    this.map.setZoom(
      (isNaN(parseInt(zoom, 10))) ? parseInt(this.zoom, 10) : parseInt(zoom, 10)
    );
    this.mapState.setZoom(this.map.getZoom());
    this.map.setCenter(new google.maps.LatLng(
      parseFloat(lat) || parseFloat(this.lat),
      parseFloat(lng) || parseFloat(this.lng)));
    this.mapState.setCenter(this.map.getCenter());
    /*this.setOverlay(
      new Overlay(
        parseInt(Layers[params.overlay], 10),
        parseFloat(params.opacity),
        params)
    );*/
    this.map.setMapTypeId(
      params.basemap || this.map.getMapTypeId()
    );
    this.mapState.setBasemap(this.map.getMapTypeId());
  }
  ngOnInit() {
    // this.setCustomControl()
    console.log('GoogleApisLoader.load.then');
    const self = this, mapProp = {
      center: new google.maps.LatLng(42, -120),
      zoom: 6,
      streetViewControl: false,
      mapTypeId: this.maptype,
      styles: new SimpleBaseMap().style,
      scaleControl: true,
      tilt: 0,
      minZoom: 4,
      maxZoom: 20,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      controlSize: 24
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    this.data = this.map.data;
    this.ready = true;

    if (!!navigator.geolocation && location.protocol === 'https:' || location.hostname === 'localhost') {
      const locator = document.createElement('div');
      locator.className = 'gmnoprint locate-button';
      locator.style.color = 'rgb(86, 86, 86)';
      locator.style.margin = '6px';
      locator.style.backgroundColor = 'rgb(255, 255, 255)';
      locator.style.textAlign = 'center';
      locator.style.borderRadius = '2px';
      locator.style['-webkit-background-clip'] = 'padding-box';
      locator.style.backgroundClip = 'padding-box';
      locator.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
      locator.style.fontSize = '10pt';
      locator.style.width = '25px';
      locator.style.height = '25px';
      locator.style.cursor = 'pointer';
      locator.style.cursor = 'hand';
      locator.innerHTML = '<i style="font-size: 14pt; line-height: 25px;" class="material-icons">gps_fixed</i>';
      locator.onclick = this.setUserLocation.bind(this);
      this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(locator);
    }
    
    // controlDiv.style.padding = '5px';
    // const logo_div = document.createElement('div')
    const logo_jornada = document.createElement('IMG');
    logo_jornada.style.padding = '5px';
    logo_jornada.style.height = '44px';
    logo_jornada.setAttribute("src",'assets/JER_logo-windmill.png');
    logo_jornada.style.cursor = 'pointer';

    const logo_usda = document.createElement('IMG')
    logo_usda.style.padding = '10px';
    logo_usda.style.height = '44px';
    logo_usda.setAttribute("src",'assets/ars-color-lockup.png');
    logo_usda.style.cursor = 'pointer';

    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(logo_usda)
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(logo_jornada)


    const input = document.createElement('input');
    input.placeholder = 'Search for a location';
    input.style.margin = '5px';
    input.style.padding = '5px';
    input.style.border = '1pt solid gray';
    input.style.borderRadius = '2px';
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(regions)'], componentRestrictions: {
        country: 'US'
      }
    });


    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    autocomplete.addListener('place_changed', function (place) {
      self.mapState.setBounds(autocomplete.getPlace().geometry.viewport);
    });

    this.mapState.dataLayers.subscribe(ls => {
      if (this.activeInfoWindow) { this.activeInfoWindow.close() }
      this.data.setMap(null);
      (ls || []).forEach(l => l.setMap(this.map))
    });

    // apply initial state
    this.applyParams(this.routing.getParams());


    // register map event handlers
    google.maps.event.addListener(
      this.map, 'idle', function (event) {
        const center = self.map.getCenter(),
          zoom = self.map.getZoom();
        self.mapState.setZoom(zoom);
        self.mapState.setCenter(center);
        self.routing.updateUrlParams({
          ll: (center.lat().toFixed(4) + ',' + center.lng().toFixed(4)),
          z: zoom
        })
      });

    google.maps.event.addListener(
      this.map, 'maptypeid_changed', function (event) {
        const basemap = self.map.getMapTypeId();
        self.mapState.setBasemap(basemap);
        self.routing.updateUrlParams({
          basemap: basemap
        })
      });

    // subscribe to mapstate changes
    this.mapState.overlays.subscribe(overlays => {
      if (this.activeInfoWindow) { this.activeInfoWindow.close() }
      this.map.overlayMapTypes.clear();
      overlays.forEach(o => this.setOverlay(o))
    });
    
    this.mapState.bounds.subscribe(b => this.map.fitBounds(b));
    this.mapState.drawingMode.subscribe(m => this.setDrawingMode(m));
    this.mapState.draw.subscribe(h => this.onDrawHandler = h);
    this.mapState.geojson.subscribe(g => {
      if (this.activeInfoWindow) { this.activeInfoWindow.close() }
      if (g) {
        this.data.addGeoJson(g)
      } else { this.clearGeojson() }
    });
    this.mapState.dataLayerStyles.subscribe(s => this.styleDataLayer(s));
    this.mapState.infoWindow.subscribe(w => {
      if (this.activeInfoWindow) { this.activeInfoWindow.close() }
      this.activeInfoWindow = w;
      w.open(this.map);
    });



  }

}

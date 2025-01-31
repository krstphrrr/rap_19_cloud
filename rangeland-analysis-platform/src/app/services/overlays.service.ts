const default_opacity = 0.8;

export interface Category {
  label: string;
  color: string;
}
export class LegendOptions {
  constructor(
    public label?: string,
    public min?: string,
    public max?: string,
    public palette?: string[],
    public categories?: Category[]) {}
}
export interface OverlayType {
  id?: string;
  name?: string;
  tileurl?: string;
  legend?: LegendOptions;
}

export interface OverlayParameters {
    opacity?: number;
    params?: any;
    handlers?: {click: Function, mousemove: Function};
    selected_type?: OverlayType;
    overlay_types?: OverlayType[];
    bounds?: google.maps.LatLngBounds;
    visible?: boolean;
    help?: string;
    years?: number[];
    legend?: LegendOptions;
    name?: string;
    id: string;
    mask?: boolean;
}

export class Overlay  {

  public utfgrid = {};
  public id: string;
  public selected_type: OverlayType;
  public overlay_types: OverlayType[];
  public minzoom = 4;
  public maxzoom = 20;
  public maxnativezoom = 12;
  public data: google.maps.Data;
  public tile_params = [];
  public year = 2024;
  public opacity: number;
  public params: any;
  public handlers: {click: Function, mousemove: Function};
  public bounds: google.maps.LatLngBounds;
  public visible: boolean;
  public help: string;
  public years: number[];
  public legend: LegendOptions;
  public name: string;
  public mask: boolean;

  constructor(params: OverlayParameters) {
    Object.assign(this, params);
    this.handlers = {
      click: (params.handlers || {click: () => {}}).click,
      mousemove: (params.handlers || {mousemove: () => {}}).mousemove
    };
    this.opacity = (params.opacity || params.opacity === 0) ? params.opacity : default_opacity
    this.config()
 }

 config() {
      if (this.overlay_types) {
        this.selected_type = this.overlay_types[0];
      }
      this.bounds =  new google.maps.LatLngBounds(
        new google.maps.LatLng( 24.51406344243852 ,  -124.76975514486658 ),
        new google.maps.LatLng( 49.3935983693073 ,  -66.93652153957034 ));
 }

}

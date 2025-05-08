import { Optional, Inject, Input, Component, OnInit, AfterViewInit } from '@angular/core';
// import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {MatDialog} from '@angular/material/dialog';

// import { MatLegacySelectChange as MatSelectChange } from '@angular/material/legacy-select';
import {MatSelectChange} from '@angular/material/select';

import { AnalysisService } from 'app/services/analysis.service';
import * as  XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PlotlyService } from 'angular-plotly.js';
// import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Plotly } from 'angular-plotly.js/lib/plotly.interface';



@Component({
    selector: 'app-landcover-trend-chart',
    templateUrl: './landcover-trend-chart.component.html',
    styleUrls: ['./landcover-trend-chart.component.css'],
    standalone: false
})
export class LandcoverTrendChartComponent implements OnInit, AfterViewInit {

  @Input() width: number;
  @Input() height: number;
  @Input() toggles: string;
  @Input() subtitle: string;
  @Input() showPrint: boolean;
  @Input() showPopOut: boolean;
  @Input() showDownload: boolean;
  @Input() filterField: string;
  @Input() filterVal: any = null;
  @Input() forReport: boolean;
  /* tslint:disable-next-line:no-input-rename */
  @Input('trend') trend_name: string;
  trend: any;
  config: any;
  filterValues: any[];

  public graph: Plotly.Data;
  data: { annual_landcover: any[], annual_biomass: any[], biweekly_biomass: any[], mask: boolean };
  clickHandler: any;
  selectHandler: any;
  img: HTMLImageElement;
  public loaded = false;
  show_fullscreen: boolean;
  initialized = false;
  mask = true;

  constructor(
    public analysis: AnalysisService,
    private dialog: MatDialog,
    private plotly: PlotlyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialog_data: any
  ) {

    if (dialog_data) {
      this.dialog_data = dialog_data;
    }
  }

  expandChart(): void {



    this.dialog.open(
      LandcoverTrendChartComponent,
      {
        width: '99%', height: '98%',
        data: {
          trend: this.trend_name,
          filterField: this.filterField,
          filterVal: this.filterVal,
          trace_toggles: this.graph.data.filter(t => t.name).map(
            (t) => {return {name: t.name, visible: t.visible}})
      }});

  }

  public async getImage(width: number, height: number): Promise<any> {
    const graphDiv = this.plotly.getInstanceByDivId(this.graph.divId);
    const plotly = await this.plotly.getPlotly()
    return plotly.Image(
      graphDiv, { format: 'png', width: width || 1280, height: height || 720, filename: this.trend_name });
  }


  public updateFilterVal(event: MatSelectChange | number) {
    if (event instanceof MatSelectChange) {
      this.filterVal = event.value;
    } else {
      this.filterVal = event;
    }
    this.loadData()
  }

  public updateTraceToggle(name: string, toggle: boolean | string) {
    this.graph.data.forEach(t => t.visible = t.name === name ? toggle : t.visible)
  }

  loadData() {
    if (!this.trend_name) {
      return;
    }
    this.trend = this.analysis.results[this.trend_name].value;
    if (!this.trend) {
      return;
    }
  
    // Special handling for combined_cover_10
    if (
      this.trend_name === 'combined_cover_10' &&
      typeof this.trend === 'object' &&
      !Array.isArray(this.trend)
    ) {
      this.loaded = true;
      const traces = [];
      const configSeries = this.analysis.config[this.trend_name].series;
  
      // Map keys to series IDs
      const keyToId = {
        iag: 'iag',
        pj: 'pj',
        arte: 'arte',
      // Add new cover classes to combined here
        afg: 'afg',
        pfg: 'pfg',
        shr: 'shr',
        tre: 'tre',
        bgr: 'bgr',
        annualprecip: 'annualprecip'
      };
      const displayOrder = [
        'afg', 'pfg', 'shr', 'tre', 'bgr',  
        'iag', 'pj', 'arte',                
        'annualprecip'                      
      ];

      const tracesByKey = {};
  
      Object.entries(this.trend).forEach(([key, arr]) => {
        if (Array.isArray(arr) && arr.length > 1) {
          const headers = arr[0];
          const yearIdx = headers.indexOf('year');
          const valueIdx = 1;
          const seriesId = keyToId[key];
          const series = configSeries.find(s => s.id === seriesId);
          
          if (series) {
            tracesByKey[seriesId] = {
              x: arr.slice(1).map(row => row[yearIdx]),
              y: arr.slice(1).map(row => row[valueIdx]),
              name: series.name,
              type: series.type,
              marker: { color: series.color },
              visible: series.visible,
              showlegend: series.visibleInLegend,
              hovertemplate: '%{x}: ' + (series.format?.prefix ?? '') + '%{y:.1f}' + (series.format?.suffix ?? ''),
              line: series.dash ? { color: series.color, dash: series.dash } : { color: series.color }
            };
          }
        }
      });
      
      displayOrder.forEach(id => {
        if (tracesByKey[id]) {
          traces.push(tracesByKey[id]);
        }
      });
  
      this.graph.data = traces;
  
      // Dynamically set y-axis max after data is built
      const allYValues = this.graph.data
        .flatMap(trace => Array.isArray(trace.y) ? trace.y : [])
        .filter(v => typeof v === 'number' && !isNaN(v));
      const maxY = allYValues.length ? Math.max(...allYValues) : 1;
      this.graph.layout.yaxis.range = [0, Math.ceil(maxY * 1.1)];
  
      return; 
    }
  
    // --- Original logic for all other trend types below ---
    this.loaded = true;
    let x: number[];
  
    const columns: string[] = this.trend[0];
    const filterColIdx = columns.indexOf(this.filterField);
  
    if (this.filterField && filterColIdx >= 0 && this.filterVal) {
      x = this.trend.slice(1).filter((row: any[]) => row[filterColIdx] === this.filterVal).map(a => a[0]);
    } else {
      x = this.trend.slice(1).map(a => a[0]);
    }
  
    this.graph.data = columns.slice(1).map((col: string, idx: number) => {
      const series = this.analysis.config[this.trend_name].series.find(t => t.id === col.toLowerCase());
      let config = {}, series_data: number[], visible: boolean | string;
  
      if (this.graph.data && series && series.name) {
        this.graph.data.forEach(t => {
          if (series.name === t.name) {
            visible = t.visible;
          }
        });
      }
  
      if (series && series !== this.filterField) {
        if (filterColIdx >= 0 && this.filterVal) {
          series_data = this.trend.slice(1)
            .filter(r => r[filterColIdx] === this.filterVal)
            .map(a => a[idx + 1])
            .map((v => v === -99 ? null : v));
        } else {
          series_data = this.trend.slice(1)
            .map(a => a[idx + 1])
            .map((v => v === -99 ? null : v));
        }
        if (!this.initialized && this.graph) {
          this.graph.layout.yaxis.range[1] = Math.max(
            this.graph.layout.yaxis.range[1], Math.max(...series_data)
          );
        }
        config = {
          'x': x,
          'y': series_data,
          'type': series && series.type,
          'visible': series && series.visible && visible,
          'showlegend': series && series.visibleInLegend,
          'hovertemplate': '%{x}: ' + (series && series.format.prefix) + '%{y:.1f}' + (series && series.format.suffix),
          'marker': {
            'color': series && series.color,
            'opacity': series && series.opacity
          },
          'name': series && series.name
        };
      }
  
      if (col === this.filterField && this.trend.slice) {
        const vals = {};
        this.trend.slice(1).map(a => vals[a[idx + 1]] = true);
        this.filterValues = Object.keys(vals).sort().map(v => parseInt(v, 10)).reverse();
      }
  
      return config;
    });
    const allYValues = this.graph.data
      .flatMap(trace => Array.isArray(trace.y) ? trace.y : [])
      .filter(v => typeof v === 'number' && !isNaN(v));
    const maxY = allYValues.length ? Math.max(...allYValues) : 1;
    this.graph.layout.yaxis.range = [0, Math.ceil(maxY * 1.1)];
  
    // if (this.filterValues && this.filterValues && !this.filterVal) {
    //   this.filterVal = parseInt(this.filterValues[0], 10);
    //   this.loadData();
    // }
    // this.initialized = true;
  }

  async print() {
    const graphDiv = this.plotly.getInstanceByDivId(this.graph.divId),
      iframe = document.createElement('IFRAME') as HTMLIFrameElement;
    let plotly = await this.plotly.getPlotly()
    plotly.toImage(
      graphDiv, { format: 'png', width: 1280, height: 720, filename: this.trend_name }).then(
        (img: string) => {
          const html = `
              <html>
                <style type="text/css" media="print">
                  @page { size: landscape; }
                </style>
                <body>
                  <img src='${img}'>
                </body>
              </html>`;
          iframe.width = '0';
          iframe.height = '0';
          iframe.id = 'printer';
          document.body.appendChild(iframe);
          iframe.contentWindow.onload = () => iframe.contentWindow.print();
          iframe.contentWindow.document.write(html);
          setTimeout(() => iframe.contentWindow.print(), 1000);

        }
      )

  }

  fullscreen() {
    this.show_fullscreen = true;
  }

  formatData() {
  // special handling for combined_cover_10
  if (
    this.trend_name === 'combined_cover_10' &&
    typeof this.trend === 'object' &&
    !Array.isArray(this.trend)
  ) {
    // get the order and ids from the config
    const configSeries = this.analysis.config[this.trend_name].series;
    const seriesIds = configSeries.map(s => s.id);

    // collect all years
    const allYears = new Set<number>();
    const seriesData = {};

    // build a map for each series: year -> value
    seriesIds.forEach(id => {
      const arr = this.trend[id];
      if (Array.isArray(arr) && arr.length > 1) {
        const headers = arr[0];
        const yearIdx = headers.indexOf('year');
        const valueIdx = 1;
        arr.slice(1).forEach(row => {
          const year = row[yearIdx];
          allYears.add(year);
          if (!seriesData[id]) seriesData[id] = {};
          seriesData[id][year] = row[valueIdx];
        });
      }
    });

    // sort years
    const years = Array.from(allYears).sort();

    // build header row: use band ids
    const header = ['year', ...seriesIds];

    // build data rows
    const rows = years.map(year => [
  year,
  ...seriesIds.map(id => {
    const val = seriesData[id]?.[year];
    // return (typeof val === 'number')
    //   ? Math.round(val * 100) / 100
    //   : (val ?? '');
    return (typeof val === 'number')
    ? (val.toString().indexOf('.') >= 0
        ? Math.round(val * 100) / 100
        : val)
    : (val ?? '');
  })
]);

    return [header, ...rows];
  }

  // default: original logic
  return this.trend.map((cols) => cols.map((cell => {
    if (typeof cell !== 'string') {
      return (cell.toString().indexOf('.') >= 0) ? Math.round(cell * 100 + Number.EPSILON) / 100 : cell;
    } else {
      return `${cell}`;
    }
  })));
}
  downloadCsv() {
    const csv = this.formatData().map((r) => r.join(',')).join('\n'),
      blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table-data.csv');
  }

  downloadExcel() {
    const data = this.formatData(),
      workbook = XLSX.utils.book_new(),
      worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'table-data');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  }

  ngOnInit() {
    if (this.dialog_data) {
      this.trend_name = this.dialog_data.trend;
      this.filterField = this.dialog_data.filterField;
    }
    this.config = this.analysis.config[this.trend_name];
    this.graph = {
      divId: `${this.trend_name}-chart`,
      layout: {
        // autosize: true,
        width: this.width ? this.width : null,
        // width: null,
        legend: { 'orientation': 'h', xanchor: 'center', x: 0.5, standoff: 20 },
        title: this.analysis.config[this.trend_name].title,
        hovermode: 'closest',
        margin: {
          l: 60,
          r: 20,
          b: 20,
          t: 20,
          pad: 5
        },
        yaxis: {
          range: [0, 0],
          title: {
            text: this.analysis.config[this.trend_name].y_axis,
            standoff: 2
          }
        },
        xaxis: {
          title: {
            text: this.analysis.config[this.trend_name].x_axis,
            standoff: 4
          },
          dtick: this.analysis.config[this.trend_name].x_axis_dtick,
          tickformat: this.analysis.config[this.trend_name].x_axis_tickformat,
        },
      },
      config: {
        displayModeBar: false,
        displaylogo: false
      },
      data: []
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.analysis.results[this.trend_name].subscribe((d) => {
        this.initialized = false; this.loadData();
        if (this.dialog_data) {
          this.updateFilterVal(this.dialog_data.filterVal);
          this.dialog_data.trace_toggles.forEach(t => this.updateTraceToggle(t.name, t.visible));
        }
      });
    })
  }
}

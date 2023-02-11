import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';

import {
  MatAutocompleteModule, MatCardModule, MatSelectModule, MatSlideToggleModule,
  MatListModule, MatInputModule, MatTooltipModule, MatMenuModule,
  MatSliderModule, MatProgressSpinnerModule, MatButtonModule,
  MatButtonToggleModule, MatCheckboxModule, MatDialogModule,
  MatSnackBarModule, MatIconModule, MatTabsModule, MatProgressBarModule
} from '@angular/material';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import 'hammerjs';

import { AppComponent } from './components/root/app.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandcoverTrendChartComponent } from './components/landcover-trend-chart/landcover-trend-chart.component';
import { LandcoverControlComponent } from './components/landcover-control/landcover-control.component';

import { AnalysisService } from './services/analysis.service';
import { RoutingService } from './services/routing.service';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { ReactiveFormsModule } from '@angular/forms';
import { LandcoverReferenceComponent } from './components/landcover-reference/landcover-reference.component';
import { MapStateService } from './services/map-state.service';
import { AnalysisStateService } from './services/analysis-state.service';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { GoogleMapsLoaderService } from './services/google-maps-loader.service';
import { LayoutComponent } from './components/layout/layout.component';
import { UrlResolverComponent } from './components/url-resolver/url-resolver.component';
// import { ShortLinkComponent } from './components/short-link/short-link.component';
import { HighlightPipe } from './pipes/highlight.pipe';
// import { LandcoverReportService } from './services/landcover-report.service';
import { PopoverComponent } from './components/popover/popover.component';
import { SplashDialogComponent } from './components/splash-dialog/splash-dialog.component';
// import { LandcoverReportOptionsComponent } from './components/landcover-report-options/landcover-report-options.component';
import { ControlPanelToggleComponent } from './components/control-panel-toggle/control-panel-toggle.component';
import { HelpComponent } from './components/help/help.component';
import { GreatPlainsConservationComponent } from './components/great-plains-conservation/great-plains-conservation.component';
import { SagebrushConservationComponent } from './components/sagebrush-conservation/sagebrush-conservation.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { OpacityControlComponent } from './components/opacity-control/opacity-control.component';
import { OverlayToggleControlComponent } from './components/overlay-toggle-control/overlay-toggle-control.component';
import { OverlayLegendComponent } from './components/overlay-legend/overlay-legend.component';
import { LayerGroupComponent } from './components/layer-group/layer-group.component';
import { OverlayTypeSelectComponent } from './components/overlay-type-select/overlay-type-select.component';

export function googleApisLoaderFactory(
  googleMapsApi: GoogleMapsLoaderService) {
  return () => googleMapsApi.load();
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    LandcoverTrendChartComponent,
    LandcoverReferenceComponent,
    ControlPanelComponent,
    DialogComponent,
    LayoutComponent,
    UrlResolverComponent,
    // ShortLinkComponent,
    HighlightPipe,
    PopoverComponent,
    SplashDialogComponent,
    LandcoverControlComponent,
    ControlPanelToggleComponent,
    HelpComponent,
    GreatPlainsConservationComponent,
    SagebrushConservationComponent,
    YearSelectorComponent,
    OpacityControlComponent,
    OverlayToggleControlComponent,
    OverlayLegendComponent,
    LayerGroupComponent,
    OverlayTypeSelectComponent
  ],
  imports: [
    TourMatMenuModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    MatMenuModule, MatDialogModule, MatSnackBarModule, MatCardModule,
    MatSelectModule, MatSlideToggleModule, MatListModule, MatInputModule,
    MatTooltipModule, MatButtonModule, MatProgressSpinnerModule,
    MatSliderModule, MatButtonToggleModule, MatCheckboxModule,
    MatAutocompleteModule, MatIconModule, MatTabsModule, MatProgressBarModule,
    PlotlyModule
  ],
  entryComponents: [AppComponent, LandcoverTrendChartComponent, SplashDialogComponent], // LandcoverReportOptionsComponent
  providers: [
    GoogleMapsLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: googleApisLoaderFactory,
      deps: [GoogleMapsLoaderService],
      multi: true
    },
    MapStateService, AnalysisStateService,  AnalysisService,  RoutingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() { }
}
